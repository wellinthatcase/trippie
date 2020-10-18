"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cfg_json_1 = __importDefault(require("./cfg/cfg.json"));
const Client_1 = require("./Client");
const client = new Client_1.TrippieClient(cfg_json_1.default);
