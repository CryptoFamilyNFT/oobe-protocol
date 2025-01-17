import { Action } from "../../types/action.interface";
import { z } from "zod";
import { Agent } from "../../agent/Agents";
import ContentGenerator from "../../utils/helpers";

const createImageAction: Action = {
  name: "CREATE_IMAGE",
  similes: [
    "generate image",
    "create artwork",
    "make image",
    "generate artwork",
    "create picture",
    "generate picture",
  ],
  description:
    "Generate an image based on a text prompt using flux, flux-3d, flux-anime, flux-realism ",
  examples: [
    [
      {
        input: {
          prompt: "A beautiful sunset over a mountain landscape",
          model: "flux-3d",
          size: "1024x1024",
          quality: "standard",
          style: "natural",
        },
        output: {
          status: "success",
          imageUrl: "https://example.com/image.png",
          message: "Successfully generated image",
        },
        explanation: "Generate an image of a sunset landscape using DALL-E 3",
      },
    ],
  ],
  schema: z.object({
    prompt: z
      .string()
      .min(1)
      .max(1000)
      .describe("The text description of the image to generate"),
    model: z
      .enum(["flux", "flux-3d", "flux-anime", "flux-realism"])
      .default("flux")
      .describe("The AI model to use for generation. 'flux-anime' for anime images, 'flux-realism' for realistic images"),
    size: z
      .enum(["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"])
      .default("1024x1024")
      .describe("The size of the generated image"),
    quality: z
      .enum(["standard", "hd"])
      .default("standard")
      .describe("The quality level of the generated image"),
    style: z
      .enum(["natural", "vivid"])
      .default("natural")
      .describe("The style of the generated image"),
    seed: z
        .enum(["random", "custom"])
        .default("random")
        .describe("The seed for the generated")
  }),
  handler: async (agent: Agent, input: Record<string, any>) => {
    try {
      if (!agent) {
        return {
          status: "error",
          message: "GenAI API key not found in agent configuration",
        };
      }

      const _func = new ContentGenerator(agent); 

      const { prompt, model, size } = input;
      const response = await _func.generateImage(agent, prompt, model, size);

      if (!response) {
        return {
          status: "error",
          message: "Failed to generate image",
        };
      }
      
      return {
        status: "success",
        imageUrl: response.url,
        message: "Successfully generated image",
      };
    } catch (error: any) {
      // Handle specific OpenAI error types
      if (error.response) {
        const { status, data } = error.response;
        if (status === 429) {
          return {
            status: "error",
            message: "Rate limit exceeded. Please try again later.",
          };
        }
        return {
          status: "error",
          message: `OpenAI API error: ${data.error?.message || error.message}`,
        };
      }

      return {
        status: "error",
        message: `Failed to generate image: ${error.message}`,
      };
    }
  },
};

export default createImageAction;