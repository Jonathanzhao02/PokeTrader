import * as numbers from '../util/numbers';

export default class Card {
  private prices: number[];
  private name: string;
  private img: string;

  constructor(name: string, prices: number[], img: string) {
    this.name = name;
    this.prices = prices.sort((a, b) => a - b);
    this.img = img;
  }

  getMaxPrice(): number {
    return numbers.max(this.prices);
  }

  getMinPrice(): number {
    return numbers.min(this.prices);
  }

  getAvgPrice(): number {
    return numbers.mean(this.prices);
  }

  getCommonPrices(): number[]{
    return numbers.sortedMode(this.prices);
  }

  getPrices(): number[] {
    return this.prices;
  }

  getName(): string {
    return this.name;
  }

  getImg(): string {
    return this.img;
  }
}
