import { Response } from 'express';
import { validate } from '@nestjs/class-validator';
import { plainToInstance } from 'class-transformer';
import {
  Res,
  Post,
  Body,
  HttpStatus,
  Controller,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';

import { OffersService } from './offers.service';
import { FirstTypeOfferDto } from './dto/create-first-offer.dto';
import { SecondTypeOfferDto } from './dto/create-second-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(public readonly offersService: OffersService) {}

  @Post()
  async postOffer(
    @Res() response: Response,
    @Body({
      transform: async (value) => {
        let transformed: FirstTypeOfferDto | SecondTypeOfferDto;
        if (value.currency_name) {
          transformed = plainToInstance(FirstTypeOfferDto, value);
        } else if (value.status) {
          transformed = plainToInstance(SecondTypeOfferDto, value);
        } else {
          throw new BadRequestException('Invalid request');
        }

        const errorsList = await validate(transformed);

        if (errorsList.length > 0) {
          const validationPipe = new ValidationPipe();
          const exceptionFactory = validationPipe.createExceptionFactory();
          throw exceptionFactory(errorsList);
        }
        return transformed;
      },
    })
    createOfferDto: FirstTypeOfferDto | SecondTypeOfferDto,
  ) {
    let data: { HttpStatus: HttpStatus; message: string };

    if (createOfferDto instanceof FirstTypeOfferDto) {
      data = await this.offersService.processFirstTypeOffer(createOfferDto);
    } else if (createOfferDto instanceof SecondTypeOfferDto) {
      data = await this.offersService.processSecondTypeOffer(createOfferDto);
    } else {
      throw new BadRequestException('Bad request');
    }

    return response.status(data.HttpStatus).send(data.message);
  }
}
