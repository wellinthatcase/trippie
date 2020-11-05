"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const Commands_1 = require("../Commands");
class Example extends Commands_1.Command {
    constructor(ctx) {
        super(ctx, "Example command.", ctx.args);
    }
    ;
    async run(...message) {
        this.ctx.send(message.join(" "));
    }
    ;
}
exports.Example = Example;
;
