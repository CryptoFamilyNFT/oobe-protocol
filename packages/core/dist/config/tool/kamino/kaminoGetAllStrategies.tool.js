"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllKaminoStrategiesTool = void 0;
const tools_1 = require("langchain/tools");
const text_splitter_1 = require("langchain/text_splitter");
const documents_1 = require("@langchain/core/documents");
const zod_1 = require("zod");
const path_1 = __importDefault(require("path"));
const node_fs_1 = require("node:fs");
class GetAllKaminoStrategiesTool extends tools_1.Tool {
    constructor(kamino) {
        super();
        this.kamino = kamino;
        this.name = "get_all_kamino_strategies";
        this.description = "Returns a list of all Kamino strategies.";
        this.UPLOAD_DIR = path_1.default.join(__dirname, "../../uploads");
    }
    async ensureUploadDirExists() {
        await node_fs_1.promises.mkdir(this.UPLOAD_DIR, { recursive: true });
    }
    getDocCachePath(key) {
        return path_1.default.join(this.UPLOAD_DIR, `${key}.json`);
    }
    async fileIsFresh(filePath, maxAgeMs) {
        try {
            const stats = await node_fs_1.promises.stat(filePath);
            const age = Date.now() - stats.mtimeMs;
            return age < maxAgeMs;
        }
        catch (err) {
            return false;
        }
    }
    async saveDocumentsToFile(filePath, docs) {
        const json = JSON.stringify(docs.map((d) => ({ pageContent: d.pageContent })), null, 2);
        await node_fs_1.promises.writeFile(filePath, json, "utf8");
    }
    async loadDocumentsFromFile(filePath) {
        const data = await node_fs_1.promises.readFile(filePath, "utf8");
        const json = JSON.parse(data);
        return json.map((d) => new documents_1.Document(d));
    }
    async _call() {
        await this.ensureUploadDirExists();
        const cachePath = this.getDocCachePath("strategies-kamino");
        const isFresh = await this.fileIsFresh(cachePath, 1000 * 60 * 60 * 0.02); // 2 minute
        try {
            let docs;
            if (isFresh) {
                docs = await this.loadDocumentsFromFile(cachePath);
            }
            else {
                const strategies = (await this.kamino.getAllKaminostrategies(10)).map((s) => {
                    console.log(s);
                    return {
                        strategy: s
                    };
                });
                if (!strategies || strategies.length === 0) {
                    throw new Error("No strategies found.");
                }
                const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
                    chunkSize: 1000,
                    chunkOverlap: 100,
                });
                docs = await splitter.createDocuments([JSON.stringify(strategies)]);
                await this.saveDocumentsToFile(cachePath, docs);
            }
            const result = docs.map((doc) => ({
                result: "success",
                strategy: doc.pageContent,
            }));
            return JSON.stringify(result, null, 2);
        }
        catch (e) {
            if (e instanceof zod_1.z.ZodError) {
                return JSON.stringify({ status: "error", message: `Invalid input: ${e.message}` });
            }
            return JSON.stringify({ status: "error", message: e.message });
        }
    }
}
exports.GetAllKaminoStrategiesTool = GetAllKaminoStrategiesTool;
//# sourceMappingURL=kaminoGetAllStrategies.tool.js.map