import cfg from "./cfg/cfg.json";
import { Context } from "./Context";
import { TrippieClient } from "./Client"; 

const client: TrippieClient = new TrippieClient(cfg); 

client.on("message", (message) => {
    if (message.author === client.user || !message.guild || !message.content.startsWith(">")) return;

    const con: string   = message.content;
    const pre: string   = con.charAt(0); 
    const arg: string[] = con.split(" ");
    const cmd: string   = con.substring(0, arg[0].length - 1); 
    const context: Context = new Context(cmd, pre, arg, client, message);

    client.channels.fetch("768925697057095681")
        .then(async (channel) => {
            const msg = await context.send(con, { channel: channel });
        });
});