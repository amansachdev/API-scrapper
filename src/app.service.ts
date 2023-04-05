import { Injectable } from '@nestjs/common';
import { myntra } from './user.model';
import * as TelegramBot from 'node-telegram-bot-api';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class AppService {
  private readonly bot: TelegramBot;
  async getHello(): Promise<any> {
    // Initialize Telegram bot with your API token
    const bot = new TelegramBot(
      '5745844294:AAH3-WBetKKXsgF_SIWV7eZObbboaQDfmjg',
      {
        polling: true,
      },
    );

    const chatId = '-1001916260144';

    // Config
    const config: AxiosRequestConfig = {
      method: 'get',
      url: 'https://www.myntra.com/gateway/v2/search/shoes?rf=Discount%20Range%3A88.0_100.0_88.0%20TO%20100.0&rows=10&o=0&plaEnabled=false&xdEnabled=true&pincode=',
      headers: {
        authority: 'www.myntra.com',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        cookie:
          '_d_id=d8939682-18c7-494d-b844-9dc9fc3bdc37; mynt-eupv=1; _gcl_au=1.1.354808702.1680198879; _ga=GA1.2.1728026522.1680198879; tvc_VID=1; at=ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbXRwWkNJNklqRWlMQ0owZVhBaU9pSktWMVFpZlEuZXlKdWFXUjRJam9pWmpKaU1XWTBPRFV0WTJZeU15MHhNV1ZrTFdFMU1XSXROVEl3TXpFNVl6UmhZMkkzSWl3aVkybGtlQ0k2SW0xNWJuUnlZUzB3TW1RM1pHVmpOUzA0WVRBd0xUUmpOelF0T1dObU55MDVaRFl5WkdKbFlUVmxOakVpTENKaGNIQk9ZVzFsSWpvaWJYbHVkSEpoSWl3aWMzUnZjbVZKWkNJNklqSXlPVGNpTENKbGVIQWlPakUyT1RVM05UQTRPRElzSW1semN5STZJa2xFUlVFaWZRLjlobGV3MEZSOVRzdWo3djROX0p0WHpWN0pDTmNGMmNKaEN2OXVWc3lGRkE=; mynt-ulc-api=pincode%3A560076; ak_RT="z=1&dm=myntra.com&si=37c813ea-8104-4634-b703-4082906f9279&ss=lfvf13bz&sl=c&tt=92j&obo=9&rl=1"; utrid=XBccHRcDVHFmTxcecntAMCM5MTkzMzM4MCQy.f1770fa58b2f32f08eff39135f03f364; _xsrf=za9ar9WJfbQTx6G6vHCXt8EpXMgUzjJD; mynt-loc-src=expiry%3A1680205334382%7Csource%3AIP; cto_bundle=FZxDrV9zdjJTOWxRMHIlMkZHOUxHNklUSW1lT2wlMkZIdFFERlNsTyUyRkZZeDN0WEpnSk12a1JQSDdCdmQ4SFdjSUVkQWFnbTBoOEgyRkwzVkN6dkdxR0Z2WDBiOTlFUzEzZyUyRmtCWDNjdHZIenpjaVRYVU9aYTglMkJUQUJ2anhSQXNNWWlKU1N0VkFnVG5zRGZOTWFGSjJTM1phSUE4bnh3JTNEJTNE; AKA_A2=A; _abck=F3DBCC25F061F77FA9A2A6D3F448B04D~0~YAAQBV3SF9bTOTqHAQAAHBMXUAkkq1n4BzcfUaL1PdI3T5kO8s7nJzLACgg/KpzqIHyClOtXqO3G0DZmg6tM07ptWCD7XQf9aaJu+7ooCcejj36EV7JoJfjYSX55r4rwAcPMoqkNALmvJdyTicVD/9h/HbSbw28BqUMsAGrZkRzPyWJkn8q6uQf7Tn5bTW7bfb+gZRxZKYlvDpDO8Fg1ocv6iXfQyq86rQcp0PV2umPEVWMvS/C3BAgiOp3cDeN3cvaM9AMgRMihHNOrDwTmJ/lxOQRFAWUAXJ7fpvzS+KpBvYyZYlZ/Jd6IGT3rVB9IrHNV8MVWbc8t+XebkBTai3lBRj7L6YbhBzW9rXIXl00xtlaEoowkBsyBr+PPckFkuSpR18MHnWAhs5DLb4FN5vyrh2O7FXo=~-1~-1~1680207473; ak_bmsc=361E04D106DC503FC8673C9A8E275000~000000000000000000000000000000~YAAQBV3SF9fTOTqHAQAAHBMXUBPM7oTV1sbkXPKHITEdhrUYdN7zBHc+R/nE7/lYOf4ElaCjbGjCrDnoiAVS2ViNwdbPl613N5/T66fqskrmtNa4rtzfZ6JIweXdzHeQNxo8kyctHLuAvP7o4e4lRJCnmI52438HK8xbI/noxAlFkInaWNPpeDA+dyBNOP6C4DEuaXr7gxRdGkbSyuhmgIE1pLEYarwUnmb8zWgyv02+7NLYNRVWEUDRjrI7Yav/5zX9SkHn/TSN9w9XZXT+OD6WtocY8QKriae4BXh7+Di2+sLYbamEWzQZ5TbqahH7K3V3cw/q7ByuRIX/CqsIv9AVwXE6nGKKct9J7RIOMVfFFwIHYwwZJgNSc4n+qMzEvU5JTxLaMrJQi6Q=; bm_sz=E0E23ABF618AE409A2B8676ACF80B4F8~YAAQBV3SF9jTOTqHAQAAHBMXUBPclcODCqkBgrawtgWx715DUxKiCkTgHVEW7RbGTJRNC1+a+qIMGTBpIcmclA9yEJNec7sneyKr3vehfZ6V9CwYsI0FRqtSsDex9Sf2oCcoP0RnNb03Pvb/fW5Sj3N4rQOPyJCAv2r86QBVZhMXGFZ1e0P2nqnHVwDqV+cVmDmB4iG1ERDZJWPQLgZExByaSIqQO8tmOdAqymtjMpXabENZVWJiQ6OdkQ2k7tr6lZTQJ/7qeJ3LXxRMid0i+BwxoNZ2EofATS9oTxWq2DlglME=~3486265~3616821; bm_sv=99718DD618DE6E9B905BCA81382A4F3C~YAAQbAHARaOwKyOHAQAAJtcXUBPy+7K9gz5UJYc31DEDKU3QGwosZai1VCnxcFLyTi2BGzs2yGsd613jWGIBdsSHk9gmz+9g8cs8N2N8WxhyHuv9S21p3eDFbh8n232Xe9R7YUTsjGPRoQHUC3NeZjBkETY3wLchKQjMmUTVvd2C11X72uca1M0ux5/2t0tmPTrpYf8Ewt3Aee6NRvizGBc+CyyIIephVa5zOH5V8Qe8KxF8ezOSZ2J/EDw51ruY~1; _abck=F3DBCC25F061F77FA9A2A6D3F448B04D~-1~YAAQFQHARVLakRSHAQAA0a0XUAln/R8gelJtz61nWOazCB0OsFDh6K5UotKuLEtnoMV7cKBxs4jsAFdGgfhFyJNh0bcJ2o9MWKXqvZruwZS9gSbreqaEg1QMp45ecyCVjXJFwUWbcFM+ELSmMay48NFYe+r/Fsvi6fwo3kNd0UZGLfFDkN3yIj8yXYy1l6tTxFGROIdaGbVsMTuPeGrG5SvRdauhVnhTQcX090/ybfdRzjVawBTJNFtHZMOfkkCKzPekXmkQDkMm4OTXaDpTU/HqHH90PdRFIvL21rVJI+HbQFVKcmt3+I3k87L84v6p62GM01xBVFkNdAPfurzGDThdpidZley3EJTitIrwlP5LmCZtfPWLdJZZ/xtkYsVmY70TEPE85DQ76dyuo8YTJj8/yd5sLOQN~-1~-1~1680202403; bm_sz=416FF5EA8468F64D0F6A9A5D73F5CEDC~YAAQFQHARVPakRSHAQAA0a0XUBO04joGu5QxzSgkdqIifN+4rDC2nPA3QKTRloSMM2GwRFssNtvynEzRC9Pa9yNRqRPNRCXUIz0xTjc2mjcktwbcHZ3yeJ69EOZ9iSFB3Gu+gjJQqEYukg58mrQxVeiA3EkpwGJZcNJvhZKsu72AcY8y0eKDMWA9yPj248xjjkpSJdb2cSJsiocwy56xpFtxl8M+LYkTi5xMHiKWYgvXRqiWfTwDSjAss2EFaIKvC9cvkzyIBG8i5EzniRSpJ6fcvtCUz+qHt6ozuTnAtjOqu6s=~3621425~4339255',
        pragma: 'no-cache',
        'sec-ch-ua':
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    };

    // Make API request using axios and send response to Telegram
    let dbArray = []
    await axios(config)
      .then(function (response) {
        const shoesData = response.data.products;
        console.log(shoesData[0].productName)
        console.log(shoesData.length)
        const newArray = [];
        for (let i = 0; i < shoesData.length; i++) {
          newArray.push(shoesData[i]?.productName);
        }
        dbArray = newArray;
        bot.sendMessage(chatId, JSON.stringify(newArray));
      })
      .catch(function (error) {
        bot.sendMessage(chatId, 'Something went Wrong');
        console.log(error);
      });
    try {
      await myntra.create({
        id: 2,
        productId: JSON.stringify(dbArray),
        ProductLink: 'https://example.com/product/ABC123',
        category: 'footwear',
        discount: '88%',
        autoUpdateTime: new Date(),
      });
      console.log('Database Insertion was Successful');
    } catch (error) {
      console.log(error)
      // console.log(error);
      console.log('DB Insertion failed');
    }
  }
}
