import cfg from "./cfg/cfg.json";
import { Context } from "./Context";
import { TrippieClient } from "./Client"; 
import { CommandHandler } from "./Commands"; 

const client: TrippieClient = new TrippieClient(cfg); 
const commands: CommandHandler = new CommandHandler("./src/Commands");

client.on("message", async (msg) => {
    if (msg.author === client.user || !msg.guild || !msg.content.startsWith(">")) 
        return;

    const context: Context = new Context(msg, ">", client);
    commands.processMessage(context);
});