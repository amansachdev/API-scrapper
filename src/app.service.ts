import { Injectable } from '@nestjs/common';
import { myntra } from './user.model';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
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

