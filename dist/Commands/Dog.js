"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const Commands_1 = require("../Commands");
const discord_js_1 = require("discord.js");
class Dog extends Commands_1.Command {
    constructor(ctx) {
        super(ctx, "DOG!", ctx.args);
    }
    ;
    async run() {
        node_fetch_1.default("https://random.dog/woof.json")
            .then(async (data) => {
            const json = await data.json();
            const embed = new discord_js_1.MessageEmbed({
                image: { url: json["url"] }
            });
            this.ctx.channel.send({ embed: embed });
        })
            .catch(() => {
            this.ctx.send("Uh oh, it seems the random dog API is dead. Maybe later.");
        });
    }
    ;
}
exports.Dog = Dog;
;
