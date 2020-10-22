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
        this.config = config;
        this.logger = new Logger_1.Logger({ "logFile": this.config.logFile, "alwaysLog": true });
        const postgreUser = this.config.postgreUrlUser;
        const postgrePass = this.config.postgreUrlPass;
        const postgreName = this.config.postgreUrlName;
        this.postgre = new pg_1.Client(`postgre://${postgreUser}:${postgrePass}@${postgreName}/${postgreUser}`);
        this.postgre.connect()
            .then(() => this.logger.log(`Connected into PostgreSQL DB "${postgreUser}"`))
            .catch(this.logger.log);
        this.login(this.config.token)
            .then(() => this.logger.log(`Logged into ${this.user.username} (${this.user.id})`))
            .catch(this.logger.log);
    }
    ;
}
exports.TrippieClient = TrippieClient;
;
