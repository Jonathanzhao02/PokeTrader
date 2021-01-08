import { MessageEmbed } from 'discord.js';
import Card from '../objects/Card';

export default function getCardEmbed(card: Card): MessageEmbed {
  const embed = new MessageEmbed()
    .setTitle(card.getName())
    .setThumbnail(card.getImg())
    .setColor('#00ff00')
    .addField('Listed Prices', card.getPrices().map(v => `$${v}`).join(' '))
    .addField('Most Common Price', `$${card.getCommonPrice()}`)
    .addField('Average Price', `$${card.getAvgPrice()}`)
    .addField('Minimum Price', `$${card.getMinPrice()}`)
    .addField('Maximum Price', `$${card.getMaxPrice()}`);

  return embed;
}