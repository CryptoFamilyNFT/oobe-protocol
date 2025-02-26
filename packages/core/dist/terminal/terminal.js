"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const process_1 = require("./process");
const logger_1 = __importDefault(require("../utils/logger/logger"));
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const langgraph_1 = require("@langchain/langgraph");
const index_tool_1 = require("../config/tool/index.tool");
const core_1 = require("../core");
const actions_1 = require("../actions");
const messages_1 = require("@langchain/core/messages");
const default_1 = __importDefault(require("../config/default"));
// Intercept console.log and console.error
const originalConsoleLog = console.log.bind(console);
const originalConsoleError = console.error.bind(console);
class OobeApp {
    constructor() {
        this.logger = new logger_1.default();
        const ascii_intro = this.logger.returnAsciiOOBE();
        // Setup TUI
        const { screen, log, box, loggerOut } = (0, process_1.createTUI)(ascii_intro);
        this.tuiScreen = screen;
        this.log = log;
        this.box = box;
        this.loggerOut = loggerOut;
        const manager = new default_1.default();
        // Initialize OobeCore
        this.oobe = new core_1.OobeCore(manager.getDefaultConfig());
        this.oobe.start();
        this.agent = this.oobe.getAgent();
        // Register actions
        this.agent.registerActions(actions_1.Actions.map((act) => act.action));
        console.log = (...args) => {
            this.handleConsoleOutput(args, 'log');
        };
        console.error = (...args) => {
        };
    }
    handleConsoleOutput(args, type) {
        const content = args.map((arg) => this.formatChunkWithTerminalStyles(arg)).join(' ');
        let formattedContent;
        if (type === 'error') {
            formattedContent = `\x1b[31m${this.getCurrentTimestamp()} [ERROR] ${content}\x1b[0m`;
        }
        else {
            formattedContent = `\x1b[32m${this.getCurrentTimestamp()} [INFO] ${content}\x1b[0m`;
        }
        this.loggerOut.log(formattedContent);
        this.loggerOut.setScrollPerc(100); // Scroll to the bottom
        this.tuiScreen.render(); // Refresh the screen
    }
    formatChunkWithTerminalStyles(chunk) {
        return chunk.toString().trim();
    }
    getCurrentTimestamp() {
        const now = new Date();
        return now.toISOString(); // Format timestamp as ISO string
    }
    async handleUserInput(value) {
        const tools = await (0, index_tool_1.createSolanaTools)(this.agent);
        const memory = new langgraph_1.MemorySaver();
        const config = { configurable: { thread_id: 'Solana Agent Kit!' } };
        const agentSub = (0, prebuilt_1.createReactAgent)({
            llm: await this.agent.genAi(),
            tools,
            checkpointSaver: memory,
            messageModifier: value,
        });
        try {
            const thought = `${value} Choose an action or set of actions and execute it that highlights your abilities. If there is no action related to your abilities, talk as oobe-protocol agent SDK.`;
            const stream = await agentSub.stream({ messages: [new messages_1.HumanMessage(thought)] }, config);
            for await (const chunk of stream) {
                let formattedMessage = chunk.agent?.messages[0].content || chunk.tools?.messages[0].content || '';
                formattedMessage = formattedMessage
                    .replace(/\*\*(.*?)\*\*/g, '\x1b[36m$1\x1b[0m')
                    .replace(/""(.*?)""/g, '\x1b[31m$1\x1b[0m');
                this.log.log(formattedMessage);
                this.log.log('-------------------');
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    createInputBox() {
        const inputBox = blessed_1.default.textbox({
            parent: this.box,
            bottom: 0,
            left: 0,
            width: '100%',
            height: 3,
            inputOnFocus: true,
            border: {
                type: 'line',
            },
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: '#f0f0f0',
                },
            },
        });
        inputBox.on('submit', async (value) => {
            try {
                await this.handleUserInput(value);
            }
            catch (error) {
                console.error(error);
            }
            inputBox.clearValue();
            inputBox.focus();
            this.tuiScreen.render();
        });
        this.tuiScreen.append(inputBox);
        inputBox.focus();
    }
    run() {
        this.createInputBox();
        this.tuiScreen.render();
        // Cleanup on exit
        const cleanup = () => {
            this.logger.info('Cleaning up before exit...');
            this.tuiScreen.destroy();
            process.exit(0);
        };
        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
        process.on('exit', cleanup);
    }
}
// Initialize and run the app
const app = new OobeApp();
app.run();
//# sourceMappingURL=terminal.js.map