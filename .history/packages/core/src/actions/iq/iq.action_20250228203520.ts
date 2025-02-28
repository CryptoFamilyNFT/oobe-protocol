import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { z } from "zod";
import { IQOperation } from "../../operations/iq/iq.operation";

const codeInIQAction: Action = {
  name: "CODE_IN_IQ",
  similes: [
    "inscribe image with ASCII",
    "inscribe image with iq",
    "create iq image",
    "use iq protocol",
    "use iq to inscribe image",
    "make iq image",
  ],
  description:
    "Inscribe an image with ASCII characters using the IQ protocol optimization for data storage",
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
          "Create and store an ASCII representation of an image using the IQ protocol, optimized for data storage",
      },
    ],
  ],
  schema: z.object({
    imageUrl: z.string().url().describe("URL of the image to be processed"),
  }),
  handler: async (agent: Agent, input: Record<string, any>) => {
    const iq = new IQOperation()
    let result: any = {};
    try {
      const { imageUrl } = input;
      
      //step-1: get buffer from url, convert image to ascii
      const imageBuffer = await iq.getImageBufferFromUrl(imageUrl);

      //setp-2: convert image to ascii
      const asciiBuffer = await iq.convertImageToASCII(imageBuffer);

      //step-3: compress image buffer

      const compressedBuffer = await iq.compressImageBuffer(asciiBuffer);

      //step-4: code in IQ - register data to DB
      try {
        const { signature, codeAccountPDA, dbAccountPDA } = await iq.userInitialize(agent.connection, agent.wallet);
        console.log("[oobe-protocol] - IQ - User initialized with signature:", signature);
        await iq.sendCode(codeAccountPDA, compressedBuffer, agent.wallet, agent.connection, IQOperation.PROGRAM_ID);
        console.log("[oobe-protocol] - IQ - Transaction successful with signature:", signature);
        await iq.dbCodeIn(agent.connection, agent.wallet, codeAccountPDA.toBase58(), "image", "0", dbAccountPDA);
        console.log("[oobe-protocol] - IQ - DB transaction successful");
        result = {signature, codeAccountPDA, dbAccountPDA};
      } catch(e) {
        console.log("[oobe-protocol] - IQ - Error: ", e);
      }
      

      return {
        status: "success",
        signature: result.signature,
        codeAccountPDA: result.codeAccountPDA,
        dbAccountPDA: result.metadataUri,
        asciiBuffer: asciiBuffer,
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