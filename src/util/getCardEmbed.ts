import { MessageEmbed } from 'discord.js';
import Card from '../objects/Card';

export default function getCardEmbed(card: Card): MessageEmbed {
  const embed = new MessageEmbed()
    .setTitle(card.getName())
    .setThumbnail(card.getImg())
    .setColor('#00ff00')
    .addField('Listed Prices', card.getPrices().map(v => `$${v.toFixed(2)}`).join(' '))
    .addField('Most Common Price', `$${card.getCommonPrice().toFixed(2)}`)
    .addField('Average Price', `$${card.getAvgPrice().toFixed(2)}`)
    .addField('Minimum Price', `$${card.getMinPrice().toFixed(2)}`)
    .addField('Maximum Price', `$${card.getMaxPrice().toFixed(2)}`);

  return embed;
}