import { Connection } from '@solana/web3.js';
import { EventEmitter } from 'events';

export class RpcRelay extends EventEmitter {
    private endpoints: string[];
    private index = 0;

    constructor(endpoints: string[]) {
        super();
        if (endpoints.length === 0) throw new Error('No RPC endpoints provided.');
        this.endpoints = endpoints;
    }

    getNextConnection(): Connection {
        const endpoint = this.endpoints[this.index];
        this.index = (this.index + 1) % this.endpoints.length;
        return new Connection(endpoint, 'confirmed');
    }

    getCurrentEndpoint(): string {
        return this.endpoints[this.index];
    }

    reportFailure(error: Error) {
        if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
            this.emit('rateLimit', this.getCurrentEndpoint());
            this.index = (this.index + 1) % this.endpoints.length;
        } else {
            this.emit('error', { endpoint: this.getCurrentEndpoint(), error });
        }
    }
}
