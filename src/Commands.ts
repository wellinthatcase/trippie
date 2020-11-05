import { readdir } from "fs";
import { Context } from "./Context"; 
import { PermissionResolvable, GuildMember } from "discord.js";

const NO_RETUR: "NO_RETUR" = "NO_RETUR";    // The Command has no return.
const NO_PERMS: "NO_PERMS" = "NO_PERMS";    // The Invoker has insufficient permissions to run the Command. 

/**
 * Information and operations about a command to help with organizing the CommandHandler. 
 * 
 * @property ctx  - The Command Context. 
 * @property name - The name of the Command. 
 * @property desc - The description of the Command. 
 * @property args - The arguments for the Command. 
 * @property laws - The permissions required to call the Command.
 * 
 * @method call - Call the Command. Most notably handles permissions and specifies the Command's return. 
 */
export class Command extends Object {
    readonly ctx: Context;
    readonly name: string; 
    readonly desc: string; 
    readonly args: string[];
    readonly laws: PermissionResolvable[] | PermissionResolvable; 

    constructor(ctx: Context, desc: string, args?: string[], laws?: PermissionResolvable[] | PermissionResolvable) {
        super(); 
        this.ctx  = ctx; 
        this.desc = desc; 
        this.args = args;
        this.laws = laws; 
        this.name = ctx.cmd;
    };

    /**
     * Call this command. 
     */
    async call(): Promise<any | typeof NO_RETUR | typeof NO_PERMS> {
        let res: any | typeof NO_RETUR; 
        const auth: GuildMember = this.ctx.member;

        if (auth.hasPermission(this.laws) || auth.permissionsIn(this.ctx.channel)) {
            res = (await this["run"](...(this.args.slice(1) || []))) || NO_RETUR;
        } else {
            this.ctx.send(`${auth.displayName}, you lack the required permissions to do that.`); 
        };
        
        return res || NO_PERMS; 
    };
};

export class CommandHandler {
    public commands: Object; 

    constructor(dir: string) {
        this.commands = {}; 

        readdir(dir, async (err: NodeJS.ErrnoException, files: string[]) => {
            if (err) { throw err; };
            
            const imports = files.map(file => file.split(".")[0]).map(id => import(`./Commands/${id}`));
            const modules = await Promise.all(imports); 

            modules.forEach(mod => {
                for (const val of Object.values<any>(mod)) {
                    if (Command.isPrototypeOf(val)) {
                        Object.defineProperty(this.commands, (val.name as String).toLowerCase(), {
                            value: val,
                            enumerable: true,
                            configurable: true
                        }); 
                    };
                };
            });
        });
    };

    /**
     * Process a message and decide whether to invoke a command.
     */
    processMessage(ctx: Context): void {
        if (this.commands.hasOwnProperty(ctx.cmd)) {
            if (this.commands[ctx.cmd].ctx === undefined) {
                Object.defineProperty(this.commands, ctx.cmd, {
                    value: new this.commands[ctx.cmd](ctx),
                    enumerable: true,
                    configurable: false
                });
            };

            this.commands[ctx.cmd].call();
        };
    };
};