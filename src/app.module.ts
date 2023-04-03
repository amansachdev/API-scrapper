import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { myntra } from './user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'ec2-3-135-218-247.us-east-2.compute.amazonaws.com',
      port: 3306,
      username: 'raw',
      password: 'password',
      database: 'loots',
      autoLoadModels: true,
      synchronize: true,
      define: {
        timestamps: false,
      },
    }),
    SequelizeModule.forFeature([myntra]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
