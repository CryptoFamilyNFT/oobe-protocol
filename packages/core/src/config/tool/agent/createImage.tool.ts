import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { create_image } from "./createImage";
import { z } from "zod";

export class SolanaCreateImageTool extends StructuredTool {
  name = "solana_create_image";
  description =
    "Create an image using OpenAI's DALL-E. Input should be a string prompt for the image.";

  constructor(private agent: Agent, override schema = z.object({
    prompt: z
      .string()
      .min(1)
      .max(1000)
      .describe("The text description of the image to generate"),
    model: z
      .enum(["dall-e-3"])
      .default("dall-e-3")
      .describe("The AI model to use for generation")
      .optional()
      .nullable(),
    size: z
      .enum(["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"])
      .default("1024x1024")
      .describe("The size of the generated image")
      .optional()
      .nullable(),
    quality: z
      .enum(["standard", "hd"])
      .default("standard")
      .describe("The quality level of the generated image")
      .optional()
      .nullable(),
    style: z
      .enum(["natural", "vivid"])
      .default("natural")
      .describe("The style of the generated image")
      .optional()
      .nullable(),
  })) {
    super();
  }

  private validateInput(input: z.infer<typeof this.schema>): void {
    if (typeof input.prompt !== "string" || input.prompt.trim().length === 0) {
      throw new Error("Input must be a non-empty string prompt");
    }
  }

  protected async _call(input: string): Promise<string> {
    console.log("\x1b[35m%s\x1b[0m", "-Input received in CREATE_IMAGE tool:", input);
    let parsedInput: z.infer<typeof this.schema> = this.schema.parse(input);
    try {
      const result = await create_image(this.agent, parsedInput.prompt.trim());

      return JSON.stringify({
        status: "success",
        message: "Image created successfully",
        ...result,
      });
    } catch (error: any) {
      console.error("Error creating image:", error);
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}