//import '../../proxy/setupProxyFetch';

class RpcQueue {
    private concurrency = 2;
    private running = 0;
    private queue: (() => void)[] = [];
  
    enqueue<T>(fn: () => Promise<T>): Promise<T> {
      return new Promise((resolve, reject) => {
        const run = async () => {
          this.running++;
          try {
            const result = await fn();
            resolve(result);
          } catch (err) {
            reject(err);
          } finally {
            this.running--;
            this.next();
          }
        };
  
        if (this.running < this.concurrency) {
          run();
        } else {
          this.queue.push(run);
        }
      });
    }
  
    private next() {
      if (this.queue.length > 0 && this.running < this.concurrency) {
        const next = this.queue.shift()!;
        next();
      }
    }
  }
  
  export const rpcQueue = new RpcQueue();
  