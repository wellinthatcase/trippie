import cfg from "./cfg/cfg.json";
import { TrippieClient, TrippieCfg } from "./Client"; 

const client: TrippieClient = new TrippieClient(cfg as TrippieCfg); 