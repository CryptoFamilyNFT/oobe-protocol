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
        const { signature } = await iq.userInitialize(agent.connection, agent.wallet);

        const dbtailTx = await iq.getTailTx(agent.connection, dbAccountPDA).then((accountInfo: any) => {
          return accountInfo.tailTx;
        });

        const result = await iq.dbCodeIn({connection: agent.connection, payer: agent.wallet, dbAccountPDA: dbAccountPDA , tailTx: dbtailTx, compressedBuffer});

      } catch(e) {

      }
      

      return {
        status: "success",
        signature: result.signature,
        mint: result.mint,
        metadataUri: result.metadataUri,
        message: "Successfully launched token on Pump.fun",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to launch token: ${error.message}`,
      };
    }
  },
};

export default codeInIQAction;