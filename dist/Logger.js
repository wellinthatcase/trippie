"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const resetter = "\x1b[0m";
;
function log(text, log_level) {
    const content = `[${timestamp}]: ${text}${resetter}`;
    var timestamp = new Date()
        .toLocaleDateString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    switch (log_level) {
        case 2:
            console.log(`${red}${content}`);
        case 1:
            console.log(`${yellow}${content}`);
        case 0 || undefined:
            console.log(`${green}${content}`);
    }
    ;
}
exports.log = log;
;
