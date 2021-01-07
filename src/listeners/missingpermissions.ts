import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SongChangeListener extends Listener {
    constructor() {
        super('missingpermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    exec(message: Message, command: Command, type: string, missing: string[]): void {
        if (!missing) return;
        try {
            message.reply(`Please add these permissions for \`${command.id}\` to work: \`${missing.join(', ')}\``);
        } catch (err) {
            console.log(err);
            return;
        }
    }
}
