import { MessageEmbed } from 'discord.js';
import Card from '../objects/Card';

export default function getCardEmbed(card: Card): MessageEmbed {
  const embed = new MessageEmbed()
    .setTitle(card.getName())
    .setThumbnail(card.getImg())
    .setColor('#00ff00')
    .addField('Listed Prices', card.getPrices().map(v => `$${v.toFixed(2)}`).join(' '));
  
  const commonPrices = card.getCommonPrices();
  
  if (commonPrices.length == 1) {
    embed.addField('\nMost Common Price', `$${commonPrices[0].toFixed(2)}`);
  } else {
    embed.addField('\nMost Common Prices', `${commonPrices.map(v => `$${v.toFixed(2)}`).join(' ')}`);
  }

  embed.addField('Average Price', `$${card.getAvgPrice().toFixed(2)}`)
    .addField('Minimum Price', `$${card.getMinPrice().toFixed(2)}`)
    .addField('Maximum Price', `$${card.getMaxPrice().toFixed(2)}`);

  return embed;
}