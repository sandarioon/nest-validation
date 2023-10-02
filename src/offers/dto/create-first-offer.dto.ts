import {
  IsUrl,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsPositive,
  ArrayMinSize,
} from 'class-validator';
import {
  IsArray,
  Validate,
  IsNotEmptyObject,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CategoryValidation implements ValidatorConstraintInterface {
  validate(data: { [key: string]: string }) {
    const keysAreString = Object.keys(data).every(
      (key) => typeof key === 'string',
    );

    const valuesAreString = Object.values(data).every(
      (value) => typeof value === 'string',
    );

    return keysAreString && valuesAreString;
  }
}

@ValidatorConstraint()
export class VerticalValidation implements ValidatorConstraintInterface {
  validate(verticals: { vertical_id: string; vertical_name: string }[]) {
    return verticals.every(
      (vertical) =>
        typeof vertical.vertical_id === 'string' &&
        typeof vertical.vertical_name === 'string',
    );
  }
}

export class FirstTypeOfferDto {
  @IsString()
  @IsNotEmpty()
  currency_name: string;

  @IsNumber()
  @IsNotEmpty()
  offers_count: number;

  @ArrayMinSize(1)
  offers: FirstTypeOfferItem[];
}

interface FirstTypeOfferCategory {
  [key: string]: string;
}

class FirstTypeOfferVertical {
  @IsString()
  @IsNotEmpty()
  vertical_id: string;

  @IsString()
  @IsNotEmpty()
  vertical_name: string;
}

export class FirstTypeOfferItem {
  public constructor(data: FirstTypeOfferItem) {
    this.offer_id = data.offer_id;
    this.offer_name = data.offer_name;
    this.offer_desc = data.offer_desc;
    this.call_to_action = data.call_to_action;
    this.disclaimer = data.disclaimer;
    this.offer_url = data.offer_url;
    this.offer_url_easy = data.offer_url_easy;
    this.payout = data.payout;
    this.payout_type = data.payout_type;
    this.amount = data.amount;
    this.image_url = data.image_url;
    this.image_url_220x124 = data.image_url_220x124;
    this.countries = data.countries;
    this.platform = data.platform;
    this.device = data.device;
    this.category = data.category;
    this.last_modified = data.last_modified;
    this.preview_url = data.preview_url;
    this.package_id = data.package_id;
    this.verticals = data.verticals;
  }

  @IsString()
  @IsNotEmpty()
  offer_id: string;

  @IsString()
  @IsNotEmpty()
  offer_name: string;

  @IsString()
  @IsNotEmpty()
  offer_desc: string;

  @IsString()
  @IsNotEmpty()
  call_to_action: string;

  @IsString()
  @IsNotEmpty()
  disclaimer: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  offer_url: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  offer_url_easy: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  payout: number;

  @IsString()
  @IsNotEmpty()
  payout_type: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image_url_220x124: string;

  @IsString({ each: true })
  countries: string[];

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  device: string;

  @Validate(CategoryValidation)
  @IsNotEmptyObject()
  category: FirstTypeOfferCategory;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  last_modified: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  preview_url: string;

  @IsString()
  @IsNotEmpty()
  package_id: string;

  @IsArray()
  @ArrayMinSize(1)
  @Validate(VerticalValidation)
  verticals: FirstTypeOfferVertical[];
}
