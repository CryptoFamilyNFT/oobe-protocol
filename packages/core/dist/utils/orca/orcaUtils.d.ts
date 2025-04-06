/**
 * Maps fee tier bps to their corresponding tick spacing values in the Orca Whirlpool protocol.
 *
 * @remarks
 * Fee tiers determine the percentage of fees collected on swaps, while tick spacing affects
 * the granularity of price ranges for liquidity positions.
 *
 * For more details, refer to:
 * - [Whirlpool Fees](https://orca-so.github.io/whirlpools/Architecture%20Overview/Whirlpool%20Fees)
 * - [Whirlpool Parameters](https://orca-so.github.io/whirlpools/Architecture%20Overview/Whirlpool%20Parameters)
 *
 * @example
 * const tickSpacing = FEE_TIERS[1]; // returns 1
 */
export declare const FEE_TIERS: {
    readonly 1: 1;
    readonly 2: 2;
    readonly 4: 4;
    readonly 5: 8;
    readonly 16: 16;
    readonly 30: 64;
    readonly 65: 96;
    readonly 100: 128;
    readonly 200: 256;
};
//# sourceMappingURL=orcaUtils.d.ts.map