import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    setInterval(async () => {
      await this.appService.getHello();
    }, 10000);
    return await this.appService.getHello();
  }
}
