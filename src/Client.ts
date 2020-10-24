import { Logger } from "./Logger"; 
import { Client as PostgreClient } from "pg";
import { Client as DiscordClient } from "discord.js"; 

/**
 * The type used for a TrippieClient config. 
 * 
 * @property token - The token of the TrippieClient bot. 
 * @property botId - The snowflake identification number of the bot. 
 * @property ownerId - The snowflake identification number of who owns the application. 
 * @property logFile - The path of the file to write debug logs to. 
 * @property postgreUrlUser - The username of the PostgreSQL database the bot must connect to. 
 * @property postgreUrlPass - The password of the aforesaid PostgreSQL database. 
 * @property postgreUrlDomain - The URL domain of the aforesaid PostgreSQL database. 
 */
interface TrippieCfg {
    logFile: string; 
    readonly botId: number; 
    readonly ownerId: number;
    readonly token: string;
    readonly postgreUrlUser: string, 
    readonly postgreUrlPass: string, 
    readonly postgreUrlName: string
};

/**
 * The essential class for the bot. 
 * 
 * @property cfg - The local config for the bot. 
 * @property logger - The internal debug logger for the bot. 
 * @property postgre - The PostgreSQL client for the bot. It is not connected until the bot has logged in. 
 */
export class TrippieClient extends DiscordClient {
    readonly logger: Logger; 
    readonly config: TrippieCfg; 
    readonly postgre: PostgreClient;

    constructor(config: TrippieCfg) {
        super();
        this.config = config; 
        this.logger = new Logger({ "logFile": this.config.logFile, "alwaysLog": true }); 

        const postgreUser: string = this.config.postgreUrlUser;
        const postgrePass: string = this.config.postgreUrlPass;
        const postgreName: string = this.config.postgreUrlName;
        this.postgre = new PostgreClient(`postgre://${postgreUser}:${postgrePass}@${postgreName}/${postgreUser}`);

        this.postgre.connect()
            .then(() => this.logger.log(`Connected into PostgreSQL DB "${postgreUser}"`))
            .catch(this.logger.log);

        this.login(this.config.token)
            .then(() => this.logger.log(`Logged into ${this.user.username} (${this.user.id})`))
            .catch(this.logger.log); 
    };
}; 