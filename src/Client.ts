import * as discord from "discord.js"; 

/**
 * The type used for a TrippieClient config. 
 * 
 * @property token - The token of the TrippieClient bot. 
 * @property botId - The snowflake identification number of the bot. 
 * @property ownerId - The snowflake identification number of who owns the application. 
 */
export interface TrippieCfg {
    readonly token: string;
    readonly botId: number; 
    readonly ownerId: number;
};

/**
 * The essential class for the bot. 
 */
export class TrippieClient extends discord.Client {
    protected cfg: TrippieCfg; 

    constructor(config: TrippieCfg) {
        super();
        this.cfg = config; 
        this.login(this.cfg.token).then(() => {
            console.log(`Successfully logged into ${this.user.username} (${this.user.id})`);
        }, err => { console.error(err); });
    }
}