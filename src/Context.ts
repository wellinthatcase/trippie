import { TrippieClient } from "./Client"; 
import { 
    User, 
    Guild, 
    Message,
    Channel, 
    DMChannel,
    TextChannel,
    GuildMember, 
    MessageEmbed,
    MessageOptions
} from "discord.js"; 

/**
 * Options for the send method inside of the Context class. 
 * 
 * @property embed   - Whether to send the message in a simple embed. 
 * @property channel - The channel to send the message to. Defaults to the invocation channel.
 */
interface SendOptions {
    embed?: boolean | undefined;
    channel?: TextChannel | DMChannel | Channel | undefined;
}; 

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
 * @method send - Shortcut to TextChannel.send where TextChannel is the `channel` parameter, or `Context.channel`. 
 */
export class Context {
    readonly cmd: string;  
    readonly msg: Message;
    readonly author: User;
    readonly guild?: Guild; 
    readonly prefix: string; 
    readonly content: string;
    readonly bot: TrippieClient; 
    readonly args: Array<string>; 
    readonly member: GuildMember; 
    readonly channel: TextChannel;  

    constructor(cmd: string, cmd_prefix: string, cmdargs: Array<string>, bot: TrippieClient, message: Message) {        
        this.cmd    = cmd;
        this.bot    = bot; 
        this.msg    = message; 
        this.args   = cmdargs; 
        this.prefix = cmd_prefix; 

        this.guild   = this.msg.guild; 
        this.author  = this.msg.author;
        this.member  = this.msg.member; 
        this.content = this.msg.content; 
        this.channel = this.msg.channel as TextChannel; 
    };

    /**
     * Send a message to a channel. 
     * 
     * @param message      - The content to send. 
     * @param channel      - The optional channel to send to. Defaults to Context.channel. 
     * @param simple_embed - Whether to send it in a simple embed. 
     */
    send(message: string, options: SendOptions = {}): Promise<Message | void> {
        if (!options.embed) {
            var content = { content: message } as MessageOptions; 
        } else {
            var content = { embed: new MessageEmbed({ description: message }) } as MessageOptions;
        };

        return ((options.channel as TextChannel | DMChannel) || this.channel).send(content);
    };
};