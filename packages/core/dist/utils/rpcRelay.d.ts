import { Connection } from '@solana/web3.js';
import { EventEmitter } from 'events';
export declare class RpcRelay extends EventEmitter {
    private endpoints;
    private index;
    constructor(endpoints: string[]);
    getNextConnection(): Connection;
    getCurrentEndpoint(): string;
    reportFailure(error: Error): void;
}
//# sourceMappingURL=rpcRelay.d.ts.map