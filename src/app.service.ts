import { Injectable } from '@nestjs/common';
import { myntra } from './user.model';
import * as TelegramBot from 'node-telegram-bot-api';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class AppService {
  private readonly bot: TelegramBot;

  async getHello() {
    // Initialize Telegram bot with your API token
    // const bot = new TelegramBot(
    //   '5745844294:AAH3-WBetKKXsgF_SIWV7eZObbboaQDfmjg',
    //   {
    //     polling: false,
    //   },
    // );

    const chatId = '-1001916260144';

    const config = {
      method: 'get',
      url: 'https://www.myntra.com/gateway/v2/search/shoes?rf=Discount%20Range%3A88.0_100.0_88.0%20TO%20100.0&rows=10&o=0&plaEnabled=false&xdEnabled=true&pincode=',
      headers: {
        authority: 'www.myntra.com',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        cookie:
          '_d_id=d8939682-18c7-494d-b844-9dc9fc3bdc37; mynt-eupv=1; _gcl_au=1.1.354808702.1680198879; _ga=GA1.2.1728026522.1680198879; tvc_VID=1; at=ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbXRwWkNJNklqRWlMQ0owZVhBaU9pSktWMVFpZlEuZXlKdWFXUjRJam9pWmpKaU1XWTBPRFV0WTJZeU15MHhNV1ZrTFdFMU1XSXROVEl3TXpFNVl6UmhZMkkzSWl3aVkybGtlQ0k2SW0xNWJuUnlZUzB3TW1RM1pHVmpOUzA0WVRBd0xUUmpOelF0T1dObU55MDVaRFl5WkdKbFlUVmxOakVpTENKaGNIQk9ZVzFsSWpvaWJYbHVkSEpoSWl3aWMzUnZjbVZKWkNJNklqSXlPVGNpTENKbGVIQWlPakUyT1RVM05UQTRPRElzSW1semN5STZJa2xFUlVFaWZRLjlobGV3MEZSOVRzdWo3djROX0p0WHpWN0pDTmNGMmNKaEN2OXVWc3lGRkE=; mynt-ulc-api=pincode%3A560076; utrid=XBccHRcDVHFmTxcecntAMCM5MTkzMzM4MCQy.f1770fa58b2f32f08eff39135f03f364; _xsrf=za9ar9WJfbQTx6G6vHCXt8EpXMgUzjJD; mynt-loc-src=expiry%3A1680205334382%7Csource%3AIP; cto_bundle=FZxDrV9zdjJTOWxRMHIlMkZHOUxHNklUSW1lT2wlMkZIdFFERlNsTyUyRkZZeDN0WEpnSk12a1JQSDdCdmQ4SFdjSUVkQWFnbTBoOEgyRkwzVkN6dkdxR0Z2WDBiOTlFUzEzZyUyRmtCWDNjdHZIenpjaVRYVU9aYTglMkJUQUJ2anhSQXNNWWlKU1N0VkFnVG5zRGZOTWFGSjJTM1phSUE4bnh3JTNEJTNE; AKA_A2=A; _abck=F3DBCC25F061F77FA9A2A6D3F448B04D~0~YAAQj8csMVPkaXCHAQAAsl1acQnA84wqvAHKIiDI4tJocL9fNLuHzGdSAtXGv7MPmcrzwSmOxNHuPlpBTJwyXXTnJ9bVXsDVGhE+ufqA4mj/g4qq9l8gcT5Al2KcYUUQ5Z6swlVALZ7uoa4YCwB4ieTxgSUW88aXugVV+3EuDgyXsLvQl5XS3Mx2zE4KvnsYToJWt9PoF6qvynRUrMIPtdvrJbgve6fXGtEqOmm1lga4H0ZwY6SPIYNwer/K8XYlavubfdBjJrITDj+98Zk5Z3YaeWDSzQ/CnHD7FaFVDVUPsMD4OBlu1eCYh1kab8Nk4ZQ3zvf/hIvhE9cLdWNwr9AGrKU9zIrEfKI/9TwdnCWl9n0uk4eU1d9LI+RHCBvCcjSQwxCsymh77J0FjuvT1zz4o2wUbeE=~-1~-1~1680207473; ak_bmsc=D226B9B088E84D6C6EFC991798203DB2~000000000000000000000000000000~YAAQj8csMVTkaXCHAQAAsl1acRML+0xvoomC4q5FPo8XHQayfEDToyuMit4+qhdCqpHlWLPLdUhgFOic6v8eajycVwgK2SzrKMwACqmCPM9KJAAm8Y/LisVYi6iF4ZLCs/GkouOMTGJ2QIv+IEnJgX+yVwT8Tmwe8ZYXf4XTFbKKwLxtg6S3HgAz/tAvgfK7TbON70kGbtfZFM8hL59JGIg5/YAL/wSmyfROVMVy/HPRv0bb3bKlJc7Uq9ED+/dJOGtj2ImD+/pxrcmPATpr15/ziet0Nrog89W1RlP8Le0z1ZHdq+GLQrPRy44XyOeYw0cDGBy0SdQjWkVBbvl9JdBxjS7lFOExHcB8OPRXAaeQ0drjb/6bCuQ5Sfdh0Okk+FlnudwMXAqByKIrljx5K8I9lkQonBE2rM2Z/z96eMrcMQ==; bm_sz=D4202DB2934F5053742ACCE9BA7070A5~YAAQj8csMVXkaXCHAQAAsl1acRPo2JQWAu8swZ3DMfKvXAFNgiFD8LbFIQTu4XoNGUGJxcOBRtqnuflIIgmHIJGL4Tpo3fYgw7MKSsVj9iSLlKYxAMkYD5FZN/WDxTEGZ+N1/bPPsfW2jiKAKkWWw+b6i+eP0352o8JhgfGRA52XgAk0gmm6Ly6VRYEB/5e4JaA7WAFsqjFQHn8RSb9hUe1EbO3Yp9T2lnujLHlxsC3D6MpsgluDAjDPBkc7zDvGGItpEH2lyx/44AewSvI4t/2RHSFx3kMMPJt7ZVYGD+VB+xo=~3425335~4470325; bm_sv=5AF8668745E009C4DF97BB394F4C3B13~YAAQj8csMaTkaXCHAQAAtWtacRPMa27wc0+R2iExL7eaprcPQTDjVFVJVcj4fTdmtvkZmuo7ll1+sx799woZJW81rk7S+m+1EOvgnVFu2Vvhf6LfuFB5wyMkT1+hqkP15m0cCAzQo3YoI9xq78hi4mEaxyCftjdMMk4/3btCvb4Kj4zTVNAidyWtoA7k8JUI9Vfc3c2UvyAeXN5qJzT6MGCDnDVAVqZUOtZ+Gqing5hWtPPFdT4CoiAhy0msFLy8~1; _abck=F3DBCC25F061F77FA9A2A6D3F448B04D~-1~YAAQFQHARVLakRSHAQAA0a0XUAln/R8gelJtz61nWOazCB0OsFDh6K5UotKuLEtnoMV7cKBxs4jsAFdGgfhFyJNh0bcJ2o9MWKXqvZruwZS9gSbreqaEg1QMp45ecyCVjXJFwUWbcFM+ELSmMay48NFYe+r/Fsvi6fwo3kNd0UZGLfFDkN3yIj8yXYy1l6tTxFGROIdaGbVsMTuPeGrG5SvRdauhVnhTQcX090/ybfdRzjVawBTJNFtHZMOfkkCKzPekXmkQDkMm4OTXaDpTU/HqHH90PdRFIvL21rVJI+HbQFVKcmt3+I3k87L84v6p62GM01xBVFkNdAPfurzGDThdpidZley3EJTitIrwlP5LmCZtfPWLdJZZ/xtkYsVmY70TEPE85DQ76dyuo8YTJj8/yd5sLOQN~-1~-1~1680202403',
        pragma: 'no-cache',
        'sec-ch-ua':
          '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
      },
    };

    // Make API request using axios and send response to Telegram
    let dbArray = [];
    await axios(config)
      .then(function (response) {
        const shoesData = response.data.products;
        console.log(shoesData[0].productName);
        console.log(shoesData.length);
        const newArray = [];
        for (let i = 0; i < shoesData.length; i++) {
          newArray.push(shoesData[i]?.productId);
        }
        dbArray = newArray;
        // bot.sendMessage(chatId, JSON.stringify(newArray));
      })
      .catch(function (error) {
        // bot.sendMessage(chatId, 'Something went Wrong');
        console.log(JSON.stringify(error));
      });
    try {
      const cached = await myntra.findOne({
        attributes: ['productId'],
        order: [['autoUpdateTime', 'DESC']],
      });
      const result = JSON.parse(cached.productId);

      function arraysEqual(a: any[], b: any[]) {
        if (a === b) {
          return true;
        }
        if (a == null || b == null || a.length !== b.length) {
          return false;
        }
        for (let i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      }

      if (arraysEqual(result, dbArray)) {
        console.log(
          'Result is same as in Database no need to send message, Trying again in 10 seconds',
        );
      } else {
        //bot.sendmessage to telegram with value == dbarray
        console.log('New data found inserting into db');
        await myntra.create({
          productId: JSON.stringify(dbArray),
          ProductLink: config.url,
          category: 'footwear',
          discount: '88%',
          autoUpdateTime: new Date(),
        });
        console.log('Database Insertion was Successful');
      }
      console.log('dbarray', dbArray);
      console.log(JSON.parse(cached.dataValues.productId), 'cached');
      return {
        data1: dbArray,
        data2: JSON.parse(cached.productId),
      };
    } catch (error) {
      console.log(error);
      // console.log(error);
      console.log('DB Insertion failed');
    }
  }
}
