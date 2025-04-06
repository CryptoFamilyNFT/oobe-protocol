import { PublicKey } from "@solana/web3.js";
import { Agent } from "../../agent/Agents";
/**
 * Close short trade on Adrena
 * @returns Transaction signature
 */
export declare function closePerpTradeShort({ agent, price, tradeMint, }: {
    agent: Agent;
    price: number;
    tradeMint: PublicKey;
}): Promise<string>;
/**
 * Close long trade on Adrena
 * @returns Transaction signature
 */
export declare function closePerpTradeLong({ agent, price, tradeMint, }: {
    agent: Agent;
    price: number;
    tradeMint: PublicKey;
}): Promise<string>;
/**
 * Open long trade on Adrena
 *
 * Note: provide the same token as collateralMint and as tradeMint to avoid swap
 * @returns Transaction signature
 */
export declare function openPerpTradeLong({ agent, price, collateralAmount, collateralMint, leverage, tradeMint, slippage, }: {
    agent: Agent;
    price: number;
    collateralAmount: number;
    collateralMint?: PublicKey;
    leverage?: number;
    tradeMint?: PublicKey;
    slippage?: number;
}): Promise<string>;
/**
 * Open short trade on Adrena
 *
 * Note: provide USDC as collateralMint to avoid swap
 * @returns Transaction signature
 */
export declare function openPerpTradeShort({ agent, price, collateralAmount, collateralMint, leverage, tradeMint, slippage, }: {
    agent: Agent;
    price: number;
    collateralAmount: number;
    collateralMint?: PublicKey;
    leverage?: number;
    tradeMint?: PublicKey;
    slippage?: number;
}): Promise<string>;
//# sourceMappingURL=adrena.operation.d.ts.map