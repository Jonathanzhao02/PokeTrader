import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import CustomClient from '../CustomClient';
import CardPriceCommand from '../commands/cardprice';

const serial_regex = /[0-9]+\/[0-9]+/;

export default class SongChangeListener extends Listener {
  client: CustomClient;

  constructor() {
    super('message', {
        emitter: 'client',
        event: 'message'
    });
  }

  exec(message: Message): void {
    if (message.author.bot || message.author.system || !serial_regex.test(message.content)) return;
    this.client.getCommandHandler().runCommand(message, new CardPriceCommand(), { content: message.content });
  }
}
