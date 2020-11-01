import { TrippieClient as Client } from "./Client"; 
import { 
    User, 
    Guild,
    Message,
    TextChannel,
    MessageOptions,
    GuildMember as Member, 
    MessageEmbed as Embed
} from "discord.js"; 

/**
 * Context class that holds general operations for each message related to a command.
 *
 * @property cmd     - The name of the invoked command. 
 * @property msg     - The message that invoked the command. 
 * @property author  - The user that invoked the command. 
 * @property guild   - The guild that the command was invoked in. 
 * @property prefix  - The prefix that invoked the command. 
 * @property content - The content of the message. 
 * @property bot     - This bot. 
 * @property args    - The arguments invoked with the command. 
 * @property member  - The member that invoked the command. 
 * @property channel - The channel the command was invoked in. 
 * 
 * @method send - Shortcut to TextChannel.send with an optional use_embed parameter. 
 */
export class Context {
    readonly bot: Client; 
    readonly cmd: string;  
    readonly msg: Message;
    readonly args: string[];
    readonly guild: Guild;   
    readonly author: User;
    readonly prefix: string;
    readonly member: Member; 
    readonly content: string;
    readonly channel: TextChannel;  

    constructor(message: Message, cprefix: string, bot: Client) {        
        const cmdargs = message.content.split(" ");
        const cmd     = cmdargs[0].substring(1);

        this.cmd    = cmd;
        this.bot    = bot; 
        this.msg    = message; 
        this.args   = cmdargs; 
        this.prefix = cprefix; 

        this.guild   = this.msg.guild; 
        this.author  = this.msg.author;
        this.member  = this.msg.member; 
        this.content = this.args.slice(1).join(" "); 
        this.channel = this.msg.channel as TextChannel; 
    };

    /**
     * Send a message to a channel. 
     * 
     * @param message      - The content to send. 
     * @param use_embed    - Whether to send the message in a simple embed. 
     */
    async send(message: string, use_embed?: boolean): Promise<Message> {
        if (!use_embed) {
            var content: MessageOptions = { content: message } as MessageOptions; 
        } else {
            var content: MessageOptions = { embed: new Embed({ description: message }) } as MessageOptions; 
        }

        return this.channel.send(content);
    };
};