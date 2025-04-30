"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWallet = void 0;
class CustomWallet {
    constructor(payer) {
        this.payer = payer;
        this.payer = payer;
    }
    async signTransaction(tx) {
        if (isVersionedTransaction(tx)) {
            tx.sign([this.payer]);
        }
        else {
            tx.partialSign(this.payer);
        }
        return tx;
    }
    async signAllTransactions(txs) {
        return txs.map((t) => {
            if (isVersionedTransaction(t)) {
                t.sign([this.payer]);
            }
            else {
                t.partialSign(this.payer);
            }
            return t;
        });
    }
    get publicKey() {
        return this.payer.publicKey;
    }
}
exports.CustomWallet = CustomWallet;
function isVersionedTransaction(tx) {
    return "version" in tx;
}
//# sourceMappingURL=signer.js.map