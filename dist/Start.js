"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cfg_json_1 = __importDefault(require("./cfg/cfg.json"));
const Context_1 = require("./Context");
const Client_1 = require("./Client");
const client = new Client_1.TrippieClient(cfg_json_1.default);
client.on("message", (message) => {
    if (message.author === client.user || !message.guild)
        return;
    const con = message.content;
    const pre = con.charAt(0);
    const arg = con.split(" ");
    const cmd = con.substring(0, arg[0].length - 1);
    const context = new Context_1.Context(cmd, pre, arg, client, message);
    client.channels.fetch("768925697057095681")
        .then(async (channel) => {
        const msg = await context.send(con, { channel: channel });
        console.log(msg.content);
    });
});
