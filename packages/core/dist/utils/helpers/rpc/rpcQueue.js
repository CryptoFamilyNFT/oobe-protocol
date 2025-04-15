"use strict";
//import '../../proxy/setupProxyFetch';
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcQueue = void 0;
class RpcQueue {
    constructor() {
        this.concurrency = 2;
        this.running = 0;
        this.queue = [];
    }
    enqueue(fn) {
        return new Promise((resolve, reject) => {
            const run = async () => {
                this.running++;
                try {
                    const result = await fn();
                    resolve(result);
                }
                catch (err) {
                    reject(err);
                }
                finally {
                    this.running--;
                    this.next();
                }
            };
            if (this.running < this.concurrency) {
                run();
            }
            else {
                this.queue.push(run);
            }
        });
    }
    next() {
        if (this.queue.length > 0 && this.running < this.concurrency) {
            const next = this.queue.shift();
            next();
        }
    }
}
exports.rpcQueue = new RpcQueue();
//# sourceMappingURL=rpcQueue.js.map