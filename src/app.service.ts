import { Injectable } from '@nestjs/common';
import { myntra } from './user.model';
import * as TelegramBot from 'node-telegram-bot-api';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class AppService {
  private readonly bot: TelegramBot;
  async getHello(): Promise<any> {
    // Initialize Telegram bot with your API token
const bot = new TelegramBot('5745844294:AAH3-WBetKKXsgF_SIWV7eZObbboaQDfmjg', {
  polling: true,
  });
  
  const chatId = '-1001916260144';
  
  // Config
  const config: AxiosRequestConfig = {
  method: 'get',
  url:
  'https://www.myntra.com/gateway/v2/search/shoes?rf=Discount%20Range%3A88.0_100.0_88.0%20TO%20100.0&rows=10&o=0&plaEnabled=false&xdEnabled=true&pincode=',
  headers: {
  authority: 'www.myntra.com',
  accept: 'application/json',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  app: 'web',
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  },
  };
  
  // Make API request using axios and send response to Telegram
  axios(config)
  .then(function (response) {
  const shoesData = response.data;
  bot.sendMessage(chatId, response.data.products);
  })
  .catch(function (error) {
  bot.sendMessage(chatId, 'Something went Wrong');
  });
    try {
      await myntra.create({
        id: 1,
        productId: 'ABC123',
        ProductLink: 'https://example.com/product/ABC123',
        category: 'electronics',
        discount: '10%',
        autoUpdateTime: new Date(),
      });
      console.log('Database Insertion was Successful');
    } catch (error) {
      console.log(error);
      console.log('DB Insertion failed');
    }
  }
}
