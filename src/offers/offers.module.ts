import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';

@Module({
  providers: [OffersService, OffersController],
  imports: [TypeOrmModule.forFeature([Offer])],
  exports: [OffersService],
})
export class OffersModule {}
