import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

class DocsMemoryAgent {
  private docs: string[];
  private contextChunks: string[];
  private model;
  private template: string;

  constructor(docs: string[], template: string, formatDocs: (docs: string[]) => string[]) {
    this.docs = docs;
    this.contextChunks = formatDocs(docs); // divide i docs in chunk gestibili
    this.model = new ChatOpenAI({ temperature: 0 });
    this.template = template;
  }

  async loadIntoMemory(): Promise<string[]> {
    const resultsArray: string[] = [];

    for (const chunk of this.contextChunks) {
      const prompt = PromptTemplate.fromTemplate(this.template);

      const chain = RunnableSequence.from([
        async () => ({ context: chunk }),
        prompt,
        this.model,
        new StringOutputParser(),
      ]);

      const partialResult = await chain.invoke({
        context: chunk,
      });

      resultsArray.push(partialResult);
    }

    return resultsArray;
  }

  async answer(query: string): Promise<string> {
    // Se l’utente chiede esplicitamente "dammi tutti i documenti"
    if (/all|some/i.test(query)) {
      return this.docs.join("\n\n");
    }

    const context = this.contextChunks.join("\n\n").slice(0, 12000); // limiti di token
    const prompt = PromptTemplate.fromTemplate(`todo`);

    const chain = RunnableSequence.from([
      async () => ({ context, question: query }),
      prompt,
      this.model,
      new StringOutputParser(),
    ]);

    return await chain.invoke({ context, question: query });
  }
}
