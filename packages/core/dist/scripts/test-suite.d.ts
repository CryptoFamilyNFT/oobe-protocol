#!/usr/bin/env node
declare function runCompleteSDKTest(): Promise<void>;
declare function testExports(): Promise<void>;
declare function runPerformanceTest(): Promise<void>;
declare function runMemoryTest(): void;
export { runCompleteSDKTest, runPerformanceTest, runMemoryTest, testExports };
//# sourceMappingURL=test-suite.d.ts.map