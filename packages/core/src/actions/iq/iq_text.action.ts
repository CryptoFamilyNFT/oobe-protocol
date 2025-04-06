import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { z } from "zod";
import { IQOperation } from "../../operations/iq/iq.operation";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const codeInTextIQAction: Action = {
  name: "TEXT_CODE_IN_IQ",
  similes: [
    "write text using IQ protocol",
    "store message with IQ",
    "inscribe text message to IQ",
    "convert message to IQ storage",
    "use IQ to store a text message",
    "IQ text inscription",
    "save text in IQ6900",
    "process text with IQ",
    "send text to IQ system"
],
  description:
    "create a text using the IQ6900 protocol for text [not image]",
  examples: [
    [
      {
        input: {
            message: "Much Luv to IQ from Bobby Hill Agent",
        },
        output: {
          status: "success",
          signature: "2ZE7Rz...",
          message: "Successfully executed IQ protocol on text",
        },
        explanation:
          "Create and store a text using the IQ protocol, optimized for data storage",
      },
    ],
  ],
  schema: z.object({
    text: z.string().describe("text to be processed"),
  }),
  handler: async (agent: Agent, input: Record<string, any>) => {
    const iq = new IQOperation()
    try {    
      
      console.log("[oobe-protocol] - IQ -  Inscribing text: ", input.message);
      const result = await iq.AstralChef(input.message, 10, 0.5, agent, "text");

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

export default codeInTextIQAction;