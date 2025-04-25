import { PublicKey } from "@solana/web3.js";
import { JupiterTokenData } from "../../types/index.interfaces";
export declare function getTokenDataByAddress(mint: PublicKey): Promise<JupiterTokenData | undefined>;
export declare function getTokenAddressFromTicker(ticker: string): Promise<string | null>;
export declare function getTokenDataByTicker(ticker: string): Promise<JupiterTokenData | undefined>;
//# sourceMappingURL=token_data.operation.d.ts.map