import {
  IsUrl,
  IsString,
  IsObject,
  Validate,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsPositive,
  ValidateIf,
  IsNotEmptyObject,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class SecondTypeOfferDataValidation
  implements ValidatorConstraintInterface
{
  validate(data: { [key: string]: SecondTypeOfferDataItem }) {
    const keysAreString = Object.keys(data).every(
      (key) => typeof key === 'string',
    );

    return keysAreString;
  }
}

class SecondTypeOfferData {
  [key: string]: SecondTypeOfferDataItem;
}

export class SecondTypeOfferDataItemOffer {
  public constructor(data: SecondTypeOfferDataItemOffer) {
    this.campaign_id = data.campaign_id;
    this.store_id = data.store_id;
    this.tracking_type = data.tracking_type;
    this.campaign_vertical = data.campaign_vertical;
    this.currency_name_singular = data.currency_name_singular;
    this.currency_name_plural = data.currency_name_plural;
    this.network_epc = data.network_epc;
    this.icon = data.icon;
    this.name = data.name;
    this.amount = data.amount;
    this.tracking_url = data.tracking_url;
    this.instructions = data.instructions;
    this.disclaimer = data.disclaimer;
    this.description = data.description;
    this.short_description = data.short_description;
    this.offer_sticker_text_1 = data.offer_sticker_text_1;
    this.offer_sticker_text_2 = data.offer_sticker_text_2;
    this.offer_sticker_text_3 = data.offer_sticker_text_3;
    this.offer_sticker_color_1 = data.offer_sticker_color_1;
    this.offer_sticker_color_2 = data.offer_sticker_color_2;
    this.offer_sticker_color_3 = data.offer_sticker_color_3;
    this.sort_order_setting = data.sort_order_setting;
    this.category_1 = data.category_1;
    this.category_2 = data.category_2;
    this.amount = data.amount;
    this.payout_usd = data.payout_usd;
    this.start_datetime = data.start_datetime;
    this.end_datetime = data.end_datetime;
    this.is_multi_reward = data.is_multi_reward;
  }

  @IsNumber()
  @IsPositive()
  campaign_id: number;

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  store_id: number | null;

  @IsString()
  @IsNotEmpty()
  tracking_type: string;

  @IsString()
  @IsNotEmpty()
  campaign_vertical: string;

  @IsString()
  @IsNotEmpty()
  currency_name_singular: string;

  @IsString()
  @IsNotEmpty()
  currency_name_plural: string;

  @IsString()
  @IsNotEmpty()
  network_epc: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  icon: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  tracking_url: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  disclaimer: string | null;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  short_description: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  offer_sticker_text_1: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  offer_sticker_text_2: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  offer_sticker_text_3: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  offer_sticker_color_1: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  offer_sticker_color_2: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  offer_sticker_color_3: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  sort_order_setting: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  category_1: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  category_2: string | null;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  payout_usd: number;

  @IsString()
  @IsNotEmpty()
  start_datetime: string;

  @IsString()
  @IsNotEmpty()
  end_datetime: string;

  @IsBoolean()
  is_multi_reward: boolean;
}
class SecondTypeOfferDataItemCountry {}
class SecondTypeOfferDataItemCity {}
class SecondTypeOfferDataItemConnectionType {}
class SecondTypeOfferDataItemDevice {}

export class SecondTypeOfferDataItemOS {
  public constructor(data: SecondTypeOfferDataItemOS) {
    this.android = data.android;
    this.ios = data.ios;
    this.web = data.web;
    this.min_ios = data.min_ios;
    this.max_ios = data.max_ios;
    this.min_android = data.min_android;
    this.max_android = data.max_android;
  }

  @IsBoolean()
  android: boolean;

  @IsBoolean()
  ios: boolean;

  @IsBoolean()
  web: boolean;

  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  min_ios: boolean;

  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  max_ios: boolean;

  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  min_android: boolean;

  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  max_android: boolean;
}

export class SecondTypeOfferDataItem {
  public constructor(data: SecondTypeOfferDataItem) {
    this.Offer = data.Offer;
    this.OS = data.OS;
  }

  @IsObject()
  @IsNotEmptyObject()
  Offer: SecondTypeOfferDataItemOffer;
  // Country: SecondTypeOfferDataItemCountry;
  // City: SecondTypeOfferDataItemCity;
  // Connection_Type: SecondTypeOfferDataItemConnectionType;
  // Device: SecondTypeOfferDataItemDevice;
  @IsObject()
  @IsNotEmptyObject()
  OS: SecondTypeOfferDataItemOS;
}

export class SecondTypeOfferDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsObject()
  @IsNotEmptyObject()
  @Validate(SecondTypeOfferDataValidation)
  data: SecondTypeOfferData;
}
