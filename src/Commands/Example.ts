import { Context } from "../Context";
import { Command } from "../Commands"; 

export class Example extends Command {
    constructor(ctx: Context) {
        super(ctx, "Example command.", ctx.args);
    };

    async run(...message: string[]): Promise<void> {
        this.ctx.send(message.join(" "));
    };
};