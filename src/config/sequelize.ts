import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('loots', 'raw', 'password', {
  host: 'ec2-3-135-218-247.us-east-2.compute.amazonaws.com',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});
