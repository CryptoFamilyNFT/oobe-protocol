"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTUI = createTUI;
const blessed_1 = __importDefault(require("blessed"));
function createTUI(ascii_intro) {
    const screen = blessed_1.default.screen({
        smartCSR: true,
        log: './log/blessed-terminal.log',
        fullUnicode: true,
        dockBorders: true,
        ignoreDockContrast: true,
        title: 'OOBE Protocol TUI',
        autoPadding: true,
        sendFocus: true,
        width: '100%',
        height: '100%',
    });
    // Enable mouse support for the screen
    screen.enableMouse();
    // Attiva il buffer alternativo per nascondere il terminale sottostante
    screen.program.alternateBuffer();
    screen.program.hideCursor();
    const box = blessed_1.default.box({
        top: '30%',
        left: 0,
        width: '50%',
        height: '70%',
        content: ascii_intro,
        tags: true,
        border: {
            type: 'line',
        },
        style: {
            fg: 'white',
            bg: 'black',
            border: {
                fg: '#f0f0f0',
            },
            hover: {
                border: {
                    fg: '#00ff00',
                },
            },
        },
        scrollable: true,
        alwaysScroll: true,
        scrollbar: {
            ch: ' ',
            track: {
                bg: 'yellow',
            },
            style: {
                inverse: true,
            },
        },
        mouse: true, // Enable mouse support for the box
    });
    const log = blessed_1.default.log({
        top: '30%',
        left: '50%',
        width: '50%',
        height: '70%',
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
        scrollable: true,
        alwaysScroll: true,
        scrollbar: {
            ch: ' ',
            track: {
                bg: 'yellow',
            },
            style: {
                inverse: true,
            },
        },
        mouse: true, // Enable mouse support for the log
    });
    const loggerOut = blessed_1.default.log({
        top: 0,
        left: 0,
        width: '100%',
        height: '30%',
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
        scrollable: true,
        alwaysScroll: true,
        scrollbar: {
            ch: ' ',
            track: {
                bg: 'yellow',
            },
            style: {
                inverse: true,
            },
        },
        mouse: true, // Enable mouse support for the loggerOut
    });
    screen.append(box);
    screen.append(log);
    screen.append(loggerOut);
    // Ensure the input box is always on top
    screen.children.forEach((child) => {
        child.setFront();
    });
    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
        // Ripristina il buffer normale prima di uscire
        screen.program.normalBuffer();
        return process.exit(0);
    });
    screen.render();
    return { screen, log, box, loggerOut };
}
//# sourceMappingURL=process.js.map