"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const discord_js_1 = require("discord.js");
class Context {
    constructor(cmd, cmd_prefix, cmdargs, bot, message) {
        this.cmd = cmd;
        this.bot = bot;
        this.msg = message;
        this.args = cmdargs;
        this.prefix = cmd_prefix;
        this.guild = this.msg.guild;
        this.author = this.msg.author;
        this.member = this.msg.member;
        this.channel = this.msg.channel;
        this.content = this.msg.content;
    }
    ;
    send(message, channel, simple_embed) {
        if (!simple_embed) {
            var content = { content: message };
        }
        else {
            var content = { embed: new discord_js_1.MessageEmbed({ description: message }) };
        }
        ;
        return (channel || this.channel).send(content).catch(console.error);
    }
    ;
}
exports.Context = Context;
;
