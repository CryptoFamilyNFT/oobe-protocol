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
export const FEE_TIERS = {
    1: 1,
    2: 2,
    4: 4,
    5: 8,
    16: 16,
    30: 64,
    65: 96,
    100: 128,
    200: 256,
  } as const;