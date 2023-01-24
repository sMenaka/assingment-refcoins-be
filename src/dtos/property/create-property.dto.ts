import { PropertyStatus } from 'src/types/enums';

export class CreatePropertyDto {
  readonly title: string;

  readonly slug: string;

  readonly type: PropertyStatus;

  readonly status: PropertyStatus;

  readonly price: number;

  readonly location: string;

  readonly description: String;

  readonly area: Number;
  
  readonly image: string;
}
