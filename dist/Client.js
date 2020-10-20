"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrippieClient = void 0;
const Logger_1 = require("./Logger");
const pg_1 = require("pg");
const discord_js_1 = require("discord.js");
;
class TrippieClient extends discord_js_1.Client {
    constructor(config) {
        super();
        this.cfg = config;
        this.logger = new Logger_1.Logger({ "logFile": "logs/trippie.log", "alwaysLog": true });
        const postgreUser = this.cfg.postgreUrlUser;
        const postgrePass = this.cfg.postgreUrlPass;
        const postgreDomain = this.cfg.postgreUrlDomain;
        this.postgre = new pg_1.Client(`postgre://${postgreUser}:${postgrePass}@${postgreDomain}/${postgreUser}`);
        this.postgre.connect().then(() => {
            this.logger.log(`Connected into PostgreSQL DB "${postgreUser}"`);
        }, err => {
            console.error(err);
        });
        this.login(this.cfg.token).then(() => {
            this.logger.log(`Logged into ${this.user.username} (${this.user.id})`);
        }, err => {
            console.error(err);
        });
    }
}
exports.TrippieClient = TrippieClient;
