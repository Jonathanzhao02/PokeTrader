import axios from 'axios';
import { HTMLElement, parse } from 'node-html-parser';
import memjs from 'memjs';
import Card from '../objects/Card';

const card_class = 'card';
const card_text = 'card-text';
const info_text = 'text-center';
const image_class = 'productImage';
const money_regex = /\$\d+\.\d{2}/;
const base_url = 'https://www.trollandtoad.com/category.php?selected-cat=7061&search-words=';

const slash_char = '%2F';
const space_char = '+';

const client = memjs.Client.create();

function constructSearchTerm(val: string) {
  return val.replace(/\//g, slash_char).replace(/\ /g, space_char);
}

function recursiveSearch(obj: HTMLElement, keyword: string, results: HTMLElement[]) {
  for (const childNode of obj.childNodes) {
    if (childNode instanceof HTMLElement) {
        
      if (childNode.classNames.some(v => v === keyword)) {
        results.push(childNode);
      } else {
        recursiveSearch(childNode, keyword, results);
      }

    } else {
      continue;
    }
  }
}

function searchCard(query: string): Promise<Card[]> {
  return new Promise((resolve, reject) => {
    const cards = [];

    console.log(`Accepted search for ${query}`);
    axios.get(base_url + constructSearchTerm(query)).then(res => {
      console.log(`Status for ${query}: ${res.status}`);
      if (res.status !== 200) reject('Bad status code: ' + res.status);
      const results = [];
      recursiveSearch(parse(res.data).lastChild as HTMLElement, card_class, results);
      results.forEach(node => {
        const imgs = [];
        recursiveSearch(node as HTMLElement, image_class, imgs);
        const img = imgs.map(val => (val as HTMLElement).getAttribute('data-src')).find(v => v);
        const card_results = [];
        recursiveSearch(node as HTMLElement, card_text, card_results);
        const title = card_results.map((node) => node.text).filter(val => val).join(' | ');
        const text_results = [];
        recursiveSearch(node as HTMLElement, info_text, text_results);
        const prices = text_results.map(node => node.text).filter(val => money_regex.test(val)).map(val => Number(val.substr(1)));
        if (title && prices.length > 0) {
          cards.push(new Card(title, prices, img));
        }
      });

      resolve(cards.filter(card => card));
    }).catch(err => reject(err));
  });
}

function fetchCardsFromCache(query: string): Promise<Card[]> {
  return new Promise((resolve, reject) => {
    client.get(query, (err, val) => {
      if (err || !val) {
        reject('Could not read value');
      } else {
        try {
          resolve(JSON.parse(val.toString('utf8')).map(obj => {
            const card = Object.create(Card.prototype);
            Object.assign(card, obj);
            return card;
          }));
        } catch (e) {
          reject('Could not parse value into object');
        }
      }
    });
  });
}

export default function fetchCard(query: string): Promise<Card[]> {
  return new Promise((resolve, reject) => {
    fetchCardsFromCache(query.toLowerCase()).then(cards => {
      console.log(`Read from cache for ${query}`);
      resolve(cards);
      client.set(query.toLowerCase(), JSON.stringify(cards), { expires: 600 });
    }).catch(() => {
      searchCard(query).then(cards => {
        resolve(cards);
        client.set(query.toLowerCase(), JSON.stringify(cards), { expires: 600 });
      }).catch(err => {
        reject(err);
      });
    });
  });
}
