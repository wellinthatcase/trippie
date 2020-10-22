"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs_1 = require("fs");
;
;
class Logger {
    constructor(cfg) {
        this.cfg = {
            "logFile": cfg.logFile || null,
            "alwaysLog": cfg.alwaysLog || false,
            "alwaysResetter": cfg.alwaysResetter || true,
            "defaultResetter": cfg.defaultResetter || "\x1b[0m",
            "defaultSuccessFg": cfg.defaultSuccessFg || "\x1b[32m",
            "defaultWarningFg": cfg.defaultWarningFg || "\x1b[33m",
            "defaultExceptiFg": cfg.defaultExceptiFg || "\x1b[31m"
        };
    }
    ;
    log(text, log_level, write) {
        if (this.cfg.alwaysResetter) {
            var resetter = this.cfg.defaultResetter;
        }
        else {
            var resetter = "";
        }
        ;
        const timestamp = new Date()
            .toLocaleDateString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
        const warning = this.cfg.defaultWarningFg;
        const success = this.cfg.defaultSuccessFg;
        const excepti = this.cfg.defaultExceptiFg;
        const content = `[${timestamp}]: ${text}`;
        const resetterContent = `${content}${resetter}`;
        switch (log_level) {
            case 2:
                console.log(`${excepti}${resetterContent}`);
            case 1:
                console.log(`${warning}${resetterContent}`);
            case 0 || undefined:
                console.log(`${success}${resetterContent}`);
        }
        ;
        if (write === true || (write === undefined && this.cfg.alwaysLog)) {
            fs_1.appendFile(this.cfg.logFile, `${content}\n`, (err) => {
                if (err) {
                    throw err;
                }
                ;
            });
        }
        ;
    }
    ;
}
exports.Logger = Logger;
;
