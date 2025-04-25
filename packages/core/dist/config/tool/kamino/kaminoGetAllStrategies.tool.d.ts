import { Tool } from "langchain/tools";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
export declare class GetAllKaminoStrategiesTool extends Tool {
    private kamino;
    name: string;
    description: string;
    constructor(kamino: kaminoOperations);
    private UPLOAD_DIR;
    private ensureUploadDirExists;
    private getDocCachePath;
    private fileIsFresh;
    private saveDocumentsToFile;
    private loadDocumentsFromFile;
    _call(): Promise<string>;
}
//# sourceMappingURL=kaminoGetAllStrategies.tool.d.ts.map