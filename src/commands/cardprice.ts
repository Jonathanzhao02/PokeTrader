import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import Card from '../objects/Card';
import getCardEmbed from '../util/getCardEmbed';
import searchCard from '../util/searchCard';

type CardPriceArguments = {
  content: string
};

function getCardPricesInfo(card: Card): string {
  let info = '';

  if (card.getPrices().length > 1) {
    info += `Prices Listed: ${card.getPrices().length}`;
    const commonPrices = card.getCommonPrices();
    
    if (commonPrices.length == 1) {
      info += `\nMost Common Price: $${commonPrices[0].toFixed(2)}`;
    } else {
      info += `\nMost Common Price: ${commonPrices.map(v => `$${v.toFixed(2)}`).join(' ')}`;
    }

    info += `\nAvg Price: $${card.getAvgPrice().toFixed(2)}`;
    info += `\nMin Price: $${card.getMinPrice().toFixed(2)}`;
    info += `\nMax Price: $${card.getMaxPrice().toFixed(2)}`;
  } else {
    info = `$${card.getPrices()[0].toFixed(2)}`;
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
      const cards = await searchCard(args.content);
      let embed = new MessageEmbed();
      embed.setTitle('Results');
      if (cards.length == 0) {
        embed.setDescription(`No results for **${args.content}**`);
      } else if (cards.length > 1) {
        cards.forEach((card, idx) => {
          embed.addField(`${idx+1}. ${card.getName()}`, getCardPricesInfo(card));
        });
      } else {
        embed = getCardEmbed(cards[0]);
      }
      message.channel.send(embed);
    } catch (e) {
      console.log(e);
      message.reply('Sorry, something went wrong with your search!');
    }
  }
}
