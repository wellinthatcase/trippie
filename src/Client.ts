import * as Discord from "discord.js"; 
import * as humanize from "humanize-duration";

interface TrippieCfg {
    token: string;
    bot_id: number; 
    owner_id: number;
};

class TrippieClient extends Discord.Client {
    protected cfg: TrippieCfg;
    
    constructor() {
        super(); 
    }

    fmtuptime(): string {
        return humanize(this.uptime);
    }
}