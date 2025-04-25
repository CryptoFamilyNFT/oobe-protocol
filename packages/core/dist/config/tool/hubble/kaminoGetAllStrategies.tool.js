"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllKaminoStrategiesTool = void 0;
const tools_1 = require("langchain/tools");
class GetAllKaminoStrategiesTool extends tools_1.Tool {
    constructor(kamino) {
        super();
        this.kamino = kamino;
        this.name = "get_all_kamino_strategies";
        this.description = "Returns a list of all Kamino strategies.";
    }
    async _call() {
        const strategies = await this.kamino.getAllKaminostrategies();
        if (strategies.length === 0 || !strategies) {
            throw new Error("No strategies found.");
        }
        return JSON.stringify(strategies.map((s) => {
            if (!s) {
                throw new Error("Invalid strategy data.");
            }
            return {
                ...s
            };
        }));
    }
}
exports.GetAllKaminoStrategiesTool = GetAllKaminoStrategiesTool;
//# sourceMappingURL=kaminoGetAllStrategies.tool.js.map