"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const discord_js_1 = require("discord.js");
class Context {
    constructor(message, cprefix, bot) {
        const cmdargs = message.content.split(" ");
        const cmd = cmdargs[0].substring(1);
        this.cmd = cmd;
        this.bot = bot;
        this.msg = message;
        this.args = cmdargs;
        this.prefix = cprefix;
        this.guild = this.msg.guild;
        this.author = this.msg.author;
        this.member = this.msg.member;
        this.content = this.args.slice(1).join(" ");
        this.channel = this.msg.channel;
    }
    ;
    async send(message, use_embed) {
        if (!use_embed) {
            var content = { content: message };
        }
        else {
            var content = { embed: new discord_js_1.MessageEmbed({ description: message }) };
        }
        return this.channel.send(content);
    }
    ;
}
exports.Context = Context;
;
