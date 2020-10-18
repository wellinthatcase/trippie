"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrippieClient = void 0;
const pg_1 = require("pg");
const discord_js_1 = require("discord.js");
;
class TrippieClient extends discord_js_1.Client {
    constructor(config) {
        super();
        this.cfg = config;
        const postgreUser = this.cfg.postgreUrlUser;
        const postgrePass = this.cfg.postgreUrlPass;
        const postgreDomain = this.cfg.postgreUrlDomain;
        this.postgre = new pg_1.Client(`postgre://${postgreUser}:${postgrePass}@${postgreDomain}/${postgreUser}`);
        this.postgre.connect().then(() => {
            console.log(`Connected into PostgreSQL DB "${postgreUser}"`);
        });
        this.login(this.cfg.token).then(() => {
            console.log(`Logged into ${this.user.username} (${this.user.id})`);
        }, err => {
            console.error(err);
        });
    }
}
exports.TrippieClient = TrippieClient;
