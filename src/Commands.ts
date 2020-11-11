import { readdir } from "fs";
import { Context } from "./Context"; 
import { 
    GuildMember as Member,
    PermissionResolvable as Permission
} from "discord.js";

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
    readonly laws: Array<Permission> | Permission; 

    constructor(ctx: Context, desc: string, args?: string[], laws?: Array<Permission> | Permission) {
        super(); 
        this.ctx  = ctx; 
        this.desc = desc; 
        this.args = args;
        this.laws = laws; 
        this.name = ctx.cmd;
    };

    /**
     * Check the permissions for the command author. 
     * 
     * I would've made this a local function inside of this.call, however
     * it felt redundant to re-declare the function each time a command is called (which is too often).
     * 
     * @param law  - The permission.
     * @param auth - The author of the command.
     */
    private async check(auth: Member, law: Permission): Promise<boolean> {
        if (auth.hasPermission(law) || (law as string) in auth.permissionsIn(this.ctx.channel)) {
            return true;
        };
    };

    /**
     * Call this command. 
     */
    async call(): Promise<void> {
        let auth: Member = this.ctx.member;

        if (Array.isArray(this.laws)) {
            for (const law of this.laws) {
                if (!(await this.check(auth, law))) {
                    var pass: boolean = false;
                    break;
                };
            };
        } else {
            var pass: boolean = await this.check(auth, this.laws);
        };

        if (pass !== false) {
            await this["run"](...(this.args.slice(1) || []));
        };
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