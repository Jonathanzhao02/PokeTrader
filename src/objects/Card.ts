export default class Card {
  prices: number[];
  name: string;
  img: string;

  constructor(name: string, prices: number[], img: string) {
    this.name = name;
    this.prices = prices.sort((a, b) => a - b);
    this.img = img;
  }

  getMaxPrice(): number {
    return this.prices[this.prices.length - 1];
  }

  getMinPrice(): number {
    return this.prices[0];
  }

  getAvgPrice(): number {
    return this.prices.reduce((accum, current) => accum + current / this.prices.length, 0);
  }

  getAllPrices(): number[] {
    return this.prices;
  }

  getCommonPrice(): number {
    let count = 0;
    let maxCount = 1;
    let maxVal = this.prices[0];

    this.prices.forEach((val, idx) => {
      count++;

      if (idx > 0) {
        if (val !== this.prices[idx - 1]) {

          if (count > maxCount) {
            maxCount = count;
            maxVal = this.prices[idx - 1];
          }

          count = 0;
        }
      }
    });

    return maxVal;
  }
}
