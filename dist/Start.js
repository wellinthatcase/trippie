"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cfg_json_1 = __importDefault(require("./cfg/cfg.json"));
const Context_1 = require("./Context");
const Client_1 = require("./Client");
const Commands_1 = require("./Commands");
const client = new Client_1.TrippieClient(cfg_json_1.default);
const commands = new Commands_1.CommandHandler("./src/Commands");
client.on("message", async (msg) => {
    if (msg.author === client.user || !msg.guild || !msg.content.startsWith(">"))
        return;
    const context = new Context_1.Context(msg, ">", client);
    commands.processMessage(context);
});
