import * as discord from "discord.js"; 

export interface TrippieCfg {
    token: string;
    bot_id: number; 
    owner_id: number;
};

export class TrippieClient extends discord.Client {
    protected cfg: TrippieCfg; 

    constructor(config: TrippieCfg) {
        super();
        this.cfg = config; 
        this.login(this.cfg.token).then(() => {
            console.log(`Successfully logged in as ${this.user.username} (${this.user.id})`);
        }, err => { console.error(err); });
    }
}