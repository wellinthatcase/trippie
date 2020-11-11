import fetch from "node-fetch";
import { Context } from "../Context";
import { Command } from "../Commands"; 
import { MessageEmbed } from "discord.js";

export class Dog extends Command {
    constructor(ctx: Context) {
        super(ctx, "DOG!", ctx.args);
    };

    async run(): Promise<void> {
        fetch("https://random.dog/woof.json")
            .then(async data => {
                const json: JSON = await data.json();
                const embed: MessageEmbed = new MessageEmbed({
                    image: { url: json["url"] }
                });

                this.ctx.channel.send({ embed: embed });
            })
            .catch(() => {
                this.ctx.send("Uh oh, it seems the random dog API is dead. Maybe later.");
            });
    };
};