"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcRelay = void 0;
const web3_js_1 = require("@solana/web3.js");
const events_1 = require("events");
class RpcRelay extends events_1.EventEmitter {
    constructor(endpoints) {
        super();
        this.index = 0;
        if (endpoints.length === 0)
            throw new Error('No RPC endpoints provided.');
        this.endpoints = endpoints;
    }
    getNextConnection() {
        const endpoint = this.endpoints[this.index];
        this.index = (this.index + 1) % this.endpoints.length;
        return new web3_js_1.Connection(endpoint, 'confirmed');
    }
    getCurrentEndpoint() {
        return this.endpoints[this.index];
    }
    reportFailure(error) {
        if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
            this.emit('rateLimit', this.getCurrentEndpoint());
            this.index = (this.index + 1) % this.endpoints.length;
        }
        else {
            this.emit('error', { endpoint: this.getCurrentEndpoint(), error });
        }
    }
}
exports.RpcRelay = RpcRelay;
//# sourceMappingURL=rpcRelay.js.map