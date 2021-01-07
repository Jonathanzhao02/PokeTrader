import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

import axios from 'axios';
import { HTMLElement, parse } from 'node-html-parser';
import { MessageEmbed } from 'discord.js';

const card_class = 'card';
const card_text = 'card-text';
const info_text = 'text-center';
const money_regex = /\$\d+\.\d{2}/;
const base_url = 'https://www.trollandtoad.com/category.php?selected-cat=7061&search-words=';

const slash_char = '%2F';
const space_char = '+';

function construct_search_term(val: string) {
  return val.replace(/\//g, slash_char).replace(/\ /g, space_char);
}

function recursive_search(obj: HTMLElement, keyword: string, results: HTMLElement[]) {
  for (const childNode of obj.childNodes) {
    if (childNode instanceof HTMLElement) {
        
      if (childNode.classNames.some(v => v === keyword)) {
        results.push(childNode);
      } else {
        recursive_search(childNode, keyword, results);
      }

    } else {
      continue;
    }
  }
}

type CardPriceArguments = {
  content: string
};

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
      const res = await axios.get(base_url + construct_search_term(args.content));
      console.log(res.status);

      let cards = [];
      recursive_search(parse(res.data).lastChild as HTMLElement, card_class, cards);
      cards = cards.slice(1, cards.length - 1);

      const embed = new MessageEmbed();
      embed.setTitle('Results');

      cards.forEach(node => {
        const card_results = [];
        recursive_search(node as HTMLElement, card_text, card_results);
        const text_results = [];
        recursive_search(node as HTMLElement, info_text, text_results);
        embed.addField(card_results.map(node => node.text).filter(val => val).join(' | '), text_results.map(node => node.text).filter(val => money_regex.test(val)).join(' '));
      });

      if (cards.length < 1) {
        embed.setDescription(`No results for **${args.content}**`);
      }

      message.channel.send(embed);
    } catch (e) {
      message.reply('Sorry, something went wrong with your search!');
    }
  }
}
