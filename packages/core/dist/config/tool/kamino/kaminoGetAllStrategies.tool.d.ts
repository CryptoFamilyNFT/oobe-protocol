import { StructuredTool } from "langchain/tools";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { z } from "zod";
export declare class GetAllKaminoStrategiesTool extends StructuredTool {
    private kamino;
    name: string;
    description: string;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
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