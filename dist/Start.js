"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cfg_json_1 = __importDefault(require("./cfg/cfg.json"));
const Context_1 = require("./Context");
const Client_1 = require("./Client");
const client = new Client_1.TrippieClient(cfg_json_1.default);
client.on("message", async (msg) => {
    if (msg.author === client.user || !msg.guild || !msg.content.startsWith(">"))
        return;
    const context = new Context_1.Context(msg, ">", client);
    const message = await context.send(context.msg.content);
});
