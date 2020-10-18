"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrippieClient = void 0;
const discord_js_1 = require("discord.js");
;
class TrippieClient extends discord_js_1.Client {
    constructor(config) {
        super();
        this.cfg = config;
        this.login(this.cfg.token).then(() => {
            console.log(`Successfully logged into ${this.user.username} (${this.user.id})`);
        }, err => { console.error(err); });
    }
}
exports.TrippieClient = TrippieClient;
