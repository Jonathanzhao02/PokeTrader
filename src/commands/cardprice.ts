import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import Card from '../objects/Card';
import search_card from '../util/search_card';

type CardPriceArguments = {
  content: string
};

function getCardPricesInfo(card: Card): string {
  let info = '';

  if (card.prices.length > 1) {
    info += `Prices Listed: ${card.prices.length}`;
    info += `\nMost common Price: $${card.getCommonPrice()}`;
    info += `\nAvg Price: $${card.getAvgPrice().toFixed(2)}`;
    info += `\nMin Price: $${card.getMinPrice()}`;
    info += `\nMax Price: $${card.getMaxPrice()}`;
  } else {
    info = `$${card.prices[0]}`;
  }
  
  return info;
}

export default class CardPriceCommand extends Command {
  constructor() {
    super('cardprice', {
      aliases: ['cardprice', 'price', 'search', 'card'],
      category: 'Util',
      description: 'Find the price for a card.',
      args: [
        {
            id: 'content',
            match: 'content',
            type: 'string'
        }
      ]
    });
  }

  async exec(message: Message, args: CardPriceArguments): Promise<void> {
    if (!args.content) {
      message.reply('You need to provide a search term!');
      return;
    }

    try {
      const cards = await search_card(args.content);
      const embed = new MessageEmbed();
      embed.setTitle('Results');
      if (cards.length < 1) {
        embed.setDescription(`No results for **${args.content}**`);
      } else {
        cards.forEach((card, idx) => {
          embed.addField(`${idx+1}. ${card.name}`, getCardPricesInfo(card));
        });
        message.channel.send(embed);
      }
    } catch (e) {
      console.log(e);
      message.reply('Sorry, something went wrong with your search!');
    }
  }
}
