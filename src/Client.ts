import * as discord from "discord.js"; 
import * as humanize from "humanize-duration";

interface TrippieCfg {
    token: string;
    bot_id: number; 
    owner_id: number;
};

class TrippieClient extends discord.Client {
    protected cfg: TrippieCfg; 

    constructor(config: TrippieCfg) {
        super();
        this.cfg = config; 
    }
}