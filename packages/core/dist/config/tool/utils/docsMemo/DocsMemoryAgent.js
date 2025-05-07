"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const openai_1 = require("@langchain/openai");
class DocsMemoryAgent {
    constructor(docs, template, formatDocs) {
        this.docs = docs;
        this.contextChunks = formatDocs(docs); // divide i docs in chunk gestibili
        this.model = new openai_1.ChatOpenAI({ temperature: 0 });
        this.template = template;
    }
    async loadIntoMemory() {
        const resultsArray = [];
        for (const chunk of this.contextChunks) {
            const prompt = prompts_1.PromptTemplate.fromTemplate(this.template);
            const chain = runnables_1.RunnableSequence.from([
                async () => ({ context: chunk }),
                prompt,
                this.model,
                new output_parsers_1.StringOutputParser(),
            ]);
            const partialResult = await chain.invoke({
                context: chunk,
            });
            resultsArray.push(partialResult);
        }
        return resultsArray;
    }
    async answer(query) {
        // Se l’utente chiede esplicitamente "dammi tutti i documenti"
        if (/all|some/i.test(query)) {
            return this.docs.join("\n\n");
        }
        const context = this.contextChunks.join("\n\n").slice(0, 12000); // limiti di token
        const prompt = prompts_1.PromptTemplate.fromTemplate(`todo`);
        const chain = runnables_1.RunnableSequence.from([
            async () => ({ context, question: query }),
            prompt,
            this.model,
            new output_parsers_1.StringOutputParser(),
        ]);
        return await chain.invoke({ context, question: query });
    }
}
//# sourceMappingURL=DocsMemoryAgent.js.map