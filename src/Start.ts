import cfg from "./cfg/cfg.json";
import { Context } from "./Context";
import { TrippieClient, TrippieCfg } from "./Client"; 

const client: TrippieClient = new TrippieClient(cfg as TrippieCfg); 

client.on("message", (message) => {
    if (message.author === client.user) return;

    const con: string   = message.content;
    const pre: string   = con.charAt(0); 
    const arg: string[] = con.split(" ");
    const cmd: string   = con.substring(0, arg[0].length - 1); 

    const context: Context = new Context(
        cmd,
        pre,
        arg,
        client,
        message
    );

    context.send(con, { embed: true }); 
});