"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const resetter = "\x1b[0m";
;
function log(text, log_level) {
    const text_with_resetter = `${text}${resetter}`;
    switch (log_level) {
        case 2:
            console.log(`${red}${text_with_resetter}`);
            break;
        case 1:
            console.log(`${yellow}${text_with_resetter}`);
            break;
        case 0 || undefined:
            console.log(`${green}${text_with_resetter}`);
    }
    ;
}
exports.log = log;
;
