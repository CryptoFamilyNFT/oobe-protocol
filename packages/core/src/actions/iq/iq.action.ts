import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { z } from "zod";
import { IQOperation } from "../../operations/iq/iq.operation";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const codeInIQAction: Action = {
  name: "IMAGE_IQ",
  similes: [
    "convert image to ASCII using IQ6900",
    "inscribe image in IQ storage",
    "process image with IQ6900",
    "transform image to ASCII via IQ",
    "store image using IQ",
    "IQ image inscription",
    "use IQ protocol for ASCII image",
    "convert image to IQ text format"
  ],
  description:
    "Inscribe an image with ASCII Art Generator (IQ6900) characters using the IQ6900 protocol optimization for data storage, image has to be 500x500 max",
  examples: [
    [
      {
        input: {
          imageUrl: "https://example.com/image.png",
        },
        output: {
          status: "success",
          signature: "2ZE7Rz...",
          DBPDA: "7nxQB...",
          message: "Successfully executed IQ protocol on image",
        },
        explanation:
          "Create and store an ASCII representation of an image using the IQ protocol, optimized for data storage. Use a font size of 10 and a density of 0.5. use iq_code_in_inscription",
      },
    ],
  ],
  schema: z.object({
    imageUrl: z.string().url().describe("URL of the image to be processed"),
  }),
  handler: async (agent: Agent, input: Record<string, any>) => {
    const iq = new IQOperation()
    try {

      const result = await iq.AstralChef(input.imageUrl, 10, 0.5, agent, "image");

      return {
        status: "success",
        signature: result,
        message: "Successfully executed IQ protocol on image",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: "Failed to execute IQ protocol on image",
        error: error.message,
      };
    }
  },
};

export default codeInIQAction;