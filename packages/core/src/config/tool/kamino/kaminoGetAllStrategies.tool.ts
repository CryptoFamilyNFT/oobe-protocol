import { StructuredTool, Tool } from "langchain/tools";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { z } from "zod";
import path from "path";
import { promises as fs } from "node:fs";

export class GetAllKaminoStrategiesTool extends StructuredTool {
  name = "get_all_kamino_strategies";
  description = "Returns a list of all Kamino strategies.";

  schema = z.object({
  }).describe("No input required");

  constructor(private kamino: kaminoOperations) {
    super();
  }

  private UPLOAD_DIR = path.join(__dirname, "../../uploads");

  private async ensureUploadDirExists() {
    await fs.mkdir(this.UPLOAD_DIR, { recursive: true });
  }

  private getDocCachePath(key: string): string {
    return path.join(this.UPLOAD_DIR, `${key}.json`);
  }

  private async fileIsFresh(filePath: string, maxAgeMs: number): Promise<boolean> {
    try {
      const stats = await fs.stat(filePath);
      const age = Date.now() - stats.mtimeMs;
      return age < maxAgeMs;
    } catch (err) {
      return false;
    }
  }

  private async saveDocumentsToFile(filePath: string, docs: Document[]) {
    const json = JSON.stringify(docs.map((d) => ({ pageContent: d.pageContent })), null, 2);
    await fs.writeFile(filePath, json, "utf8");
  }

  private async loadDocumentsFromFile(filePath: string): Promise<Document[]> {
    const data = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(data);
    return json.map((d: any) => new Document(d));
  }

  async _call(): Promise<string> {
    await this.ensureUploadDirExists();
    const cachePath = this.getDocCachePath("strategies-kamino");
    const isFresh = await this.fileIsFresh(cachePath, 1000 * 60 * 60 * 0.02); // 2 minute

    try {
      let docs: Document[];

      if (isFresh) {
        docs = await this.loadDocumentsFromFile(cachePath);
      } else {
        const strategies = (await this.kamino.getAllKaminostrategies(10)).map((s) => {
          console.log(s);
          return {
            strategy: s 
          };
        });
        

        if (!strategies || strategies.length === 0) {
          throw new Error("No strategies found.");
        }

        const splitter = new RecursiveCharacterTextSplitter({
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
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        return JSON.stringify({ status: "error", message: `Invalid input: ${e.message}` });
      }
      return JSON.stringify({ status: "error", message: e.message });
    }
  }
}
