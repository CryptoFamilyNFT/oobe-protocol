declare class RpcQueue {
    private concurrency;
    private running;
    private queue;
    enqueue<T>(fn: () => Promise<T>): Promise<T>;
    private next;
}
export declare const rpcQueue: RpcQueue;
export {};
//# sourceMappingURL=rpcQueue.d.ts.map