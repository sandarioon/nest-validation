import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError, validate } from 'class-validator';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

import {
  SecondTypeOfferDto,
  SecondTypeOfferDataItem,
  SecondTypeOfferDataItemOS,
  SecondTypeOfferDataItemOffer,
} from './dto/create-second-offer.dto';
import {
  FirstTypeOfferDto,
  FirstTypeOfferItem,
} from './dto/create-first-offer.dto';
import { IOffer } from './offers.types';
import { Offer } from './entities/offer.entity';
import { booleanToNumber } from 'libs/utils/src';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offersRepository: Repository<Offer>,
  ) {}

  async processFirstTypeOffer(dto: FirstTypeOfferDto) {
    try {
      for await (const offerItem of dto.offers) {
        const offer: FirstTypeOfferItem = new FirstTypeOfferItem(offerItem);
        const errors: ValidationError[] = await validate(offer);

        if (errors.length > 0) {
          errors.forEach((el) => Logger.warn(el, 'OffersService'));
        }

        const formattedOffer: Omit<IOffer, 'id'> =
          this.mapFirstTypeOffer(offer);

        // Adding formattedOffer to PostgreSQL table after...

        return {
          message: 'OK',
          HttpStatus: HttpStatus.CREATED,
        };
      }
    } catch (error) {
      Logger.error(error, 'OffersService');
      return {
        message: 'Internal Server Error',
        HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  private mapFirstTypeOffer(offer: FirstTypeOfferItem) {
    const {
      device,
      offer_id,
      platform,
      offer_url,
      image_url,
      offer_name,
      offer_desc,
      call_to_action,
    } = offer;

    return {
      name: offer_name,
      // This slug can be not unique here, but I need some more data
      // examples to find out how to generate a unique one :)
      slug: 'First provider' + offer_name,
      description: offer_desc,
      requirements: call_to_action,
      thumbnail: image_url,
      isDesktop: booleanToNumber(platform === 'desktop'),
      isAndroid: booleanToNumber(
        platform === 'mobile' && device !== 'iphone_ipad',
      ),
      isIos: booleanToNumber(platform === 'mobile' && device === 'iphone_ipad'),
      offerUrlTemplate: offer_url,
      providerName: 'First provider',
      externalOfferId: offer_id,
    };
  }

  async processSecondTypeOffer(dto: SecondTypeOfferDto) {
    try {
      const offers: SecondTypeOfferDataItem[] = [];

      for (const offer in dto.data) {
        offers.push(dto.data[offer]);
      }

      for await (const offer of offers) {
        const offerData = new SecondTypeOfferDataItemOffer(offer.Offer);
        const offerDataErrors = await validate(offerData);

        const OSData = new SecondTypeOfferDataItemOS(offer.OS);
        const OSDataErrors = await validate(OSData);

        const errors = offerDataErrors.concat(OSDataErrors);

        if (errors.length > 0) {
          errors.forEach((el) => Logger.warn(el, 'OffersService'));
        }

        const formattedOffer: Omit<IOffer, 'id'> = this.mapSecondTypeOffer(
          offerData,
          OSData,
        );

        // Adding formattedOffer to PostgreSQL table after...

        return {
          message: 'OK',
          HttpStatus: HttpStatus.CREATED,
        };
      }
    } catch (error) {
      Logger.error(error, 'OffersService');
      return {
        message: 'Internal Server Error',
        HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  private mapSecondTypeOffer(
    offerData: SecondTypeOfferDataItemOffer,
    OSData: SecondTypeOfferDataItemOS,
  ) {
    const { campaign_id, icon, name, tracking_url, instructions, description } =
      offerData;
    const { android, ios, web } = OSData;

    return {
      name,
      slug: 'Second provider' + name,
      description,
      requirements: instructions,
      thumbnail: icon,
      isDesktop: booleanToNumber(web),
      isAndroid: booleanToNumber(android),
      isIos: booleanToNumber(ios),
      offerUrlTemplate: tracking_url,
      providerName: 'Second provider',
      externalOfferId: String(campaign_id),
    };
  }
}
