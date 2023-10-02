import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CONFIG } from 'libs/config/src';
import { OffersModule } from './offers/offers.module';
import { configValidationSchema } from './config.schema';
import { OffersController } from './offers/offers.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    OffersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
          entities: ['dist/**/*.entity.js'],
          host: CONFIG.POSTGRES_HOST,
          port: CONFIG.POSTGRES_PORT,
          username: CONFIG.POSTGRES_USER,
          password: CONFIG.POSTGRES_PASSWORD,
          database: CONFIG.POSTGRES_DATABASE,
        };
      },
    }),
  ],
  controllers: [OffersController],
})
export class AppModule {}
