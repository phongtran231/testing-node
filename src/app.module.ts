import { ClientModule } from './modules/client/client.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configs/configuration';

@Module({
  imports: [
    SeederModule,
    ClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('db.db_host'),
          port: configService.get('db.db_port'),
          username: configService.get('db.user_name'),
          password: configService.get('db.password'),
          database: configService.get('db.db_name'),
          entities: [__dirname + './../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/../migrations/*{.ts,.js}'],
          synchronize: false,
          logging: false,
          poolSize: 10,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
