import cfg from "./cfg/cfg.json";
import { Context } from "./Context";
import { Message } from "discord.js"; 
import { TrippieClient } from "./Client"; 

const client: TrippieClient = new TrippieClient(cfg); 

client.on("message", async (msg) => {
    if (msg.author === client.user || !msg.guild || !msg.content.startsWith(">")) 
        return;

    const context: Context = new Context(msg, ">", client);
    const message: Message = await context.send(context.msg.content); 
});