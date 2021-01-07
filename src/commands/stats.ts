import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { etimeLabeled } from '../util/etime';

export default class StatsCommand extends Command {
    constructor() {
        super('stats', {
           aliases: ['stats', 'uptime'],
           category: 'Util',
           description: 'Displays stats about the bot.',
           channel: 'guild',
           clientPermissions: ['SEND_MESSAGES'],
           cooldown: 1000
        });
    }

    exec(message: Message): void {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('📊 Stats 📊')
            .addField('\u200B', '**Current Session**')
            .addField('⏱️ Runtime', etimeLabeled(this.client.uptime))
            .addField('📅 Up Since', this.client.readyAt.toUTCString());

        message.channel.send(embed);
    }
}
