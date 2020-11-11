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
exports.CommandHandler = exports.Command = void 0;
const fs_1 = require("fs");
const NO_RETUR = "NO_RETUR";
const NO_PERMS = "NO_PERMS";
class Command extends Object {
    constructor(ctx, desc, args, laws) {
        super();
        this.ctx = ctx;
        this.desc = desc;
        this.args = args;
        this.laws = laws;
        this.name = ctx.cmd;
    }
    ;
    async check(auth, law) {
        if (auth.hasPermission(law) || law in auth.permissionsIn(this.ctx.channel)) {
            return true;
        }
        ;
    }
    ;
    async call() {
        let auth = this.ctx.member;
        if (Array.isArray(this.laws)) {
            for (const law of this.laws) {
                if (!(await this.check(auth, law))) {
                    var pass = false;
                    break;
                }
                ;
            }
            ;
        }
        else {
            var pass = await this.check(auth, this.laws);
        }
        ;
        if (pass !== false) {
            await this["run"](...(this.args.slice(1) || [])) || NO_RETUR;
        }
        ;
    }
    ;
}
exports.Command = Command;
;
class CommandHandler {
    constructor(dir) {
        this.commands = {};
        fs_1.readdir(dir, async (err, files) => {
            if (err) {
                throw err;
            }
            ;
            const imports = files.map(file => file.split(".")[0]).map(id => Promise.resolve().then(() => __importStar(require(`./Commands/${id}`))));
            const modules = await Promise.all(imports);
            modules.forEach(mod => {
                for (const val of Object.values(mod)) {
                    if (Command.isPrototypeOf(val)) {
                        Object.defineProperty(this.commands, val.name.toLowerCase(), {
                            value: val,
                            enumerable: true,
                            configurable: true
                        });
                    }
                    ;
                }
                ;
            });
        });
    }
    ;
    processMessage(ctx) {
        if (this.commands.hasOwnProperty(ctx.cmd)) {
            if (this.commands[ctx.cmd].ctx === undefined) {
                Object.defineProperty(this.commands, ctx.cmd, {
                    value: new this.commands[ctx.cmd](ctx),
                    enumerable: true,
                    configurable: false
                });
            }
            ;
            this.commands[ctx.cmd].call();
        }
        ;
    }
    ;
}
exports.CommandHandler = CommandHandler;
;
