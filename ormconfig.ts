import { ConfigService } from '@nestjs/config';
import {config} from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('MYSQL_HOST'),
  port: 3306,
  username: configService.get('MYSQL_USER'),
  password: configService.get('MYSQL_PASSWORD'),
  database: configService.get('MYSQL_DATABASE'),
  entities: [__dirname + '/src/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});