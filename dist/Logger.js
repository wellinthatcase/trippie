"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
;
;
class Logger {
    constructor(cfg) {
        this.cfg = {
            "alwaysResetter": cfg.alwaysResetter || true,
            "defaultResetter": cfg.defaultResetter || "\x1b[0m",
            "defaultSuccessFg": cfg.defaultSuccessFg || "\x1b[32m",
            "defaultWarningFg": cfg.defaultWarningFg || "\x1b[33m",
            "defaultExceptiFg": cfg.defaultExceptiFg || "\x1b[31m"
        };
    }
    ;
    log(text, log_level) {
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
        const content = `[${timestamp}]: ${text}${resetter}`;
        switch (log_level) {
            case 2:
                console.log(`${excepti}${content}`);
            case 1:
                console.log(`${warning}${content}`);
            case 0 || undefined:
                console.log(`${success}${content}`);
        }
        ;
    }
    ;
}
exports.Logger = Logger;
;
