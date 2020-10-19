import { log } from "./Logger"; 
import { Client as PostgreClient } from "pg";
import { Client as DiscordClient } from "discord.js"; 

/**
 * The type used for a TrippieClient config. 
 * 
 * @property token - The token of the TrippieClient bot. 
 * @property botId - The snowflake identification number of the bot. 
 * @property ownerId - The snowflake identification number of who owns the application. 
 * @property postgreUrlUser - The username of the PostgreSQL database the bot must connect to. 
 * @property postgreUrlPass - The password of the aforesaid PostgreSQL database. 
 * @property postgreUrlDomain - The URL domain of the aforesaid PostgreSQL database. 
 */
export interface TrippieCfg {
    readonly token: string;
    readonly botId: number; 
    readonly ownerId: number;
    readonly postgreUrlUser: string, 
    readonly postgreUrlPass: string, 
    readonly postgreUrlDomain: string
};

/**
 * The essential class for the bot. 
 * 
 * @property cfg - The local config for the bot. 
 * @property postgre - The PostgreSQL client for the bot. It is not connected until the bot has logged in. 
 */
export class TrippieClient extends DiscordClient {
    protected cfg: TrippieCfg; 
    protected postgre: PostgreClient; 

    constructor(config: TrippieCfg) {
        super();
        this.cfg = config; 

        const postgreUser: string = this.cfg.postgreUrlUser;
        const postgrePass: string = this.cfg.postgreUrlPass;
        const postgreDomain: string = this.cfg.postgreUrlDomain; 
        this.postgre = new PostgreClient(`postgre://${postgreUser}:${postgrePass}@${postgreDomain}/${postgreUser}`);

        this.postgre.connect().then(() => { 
            log(`Connected into PostgreSQL DB "${postgreUser}"`); 
        });

        this.login(this.cfg.token).then(() => {
            log(`Logged into ${this.user.username} (${this.user.id})`); 
        }, err => { 
            console.error(err); 
        });
    }
}