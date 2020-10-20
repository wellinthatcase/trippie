"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs = __importStar(require("fs"));
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
            fs.appendFile(this.cfg.logFile, `${content}\n`, (err) => {
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
