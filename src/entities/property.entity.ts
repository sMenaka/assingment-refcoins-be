import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PropertyStatus } from 'src/types/enums';
import { v4 as uuidv4 } from 'uuid';

export type PropertyDocument = HydratedDocument<Property>;
@Schema({ timestamps: true})
export class Property {
  @Prop({
    required: true,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  type: PropertyStatus;

  @Prop()
  status: PropertyStatus;

  @Prop()
  price: string;

  @Prop()
  location: string;

  @Prop()
  description: String;

  @Prop()
  area: Number;

  @Prop({default:false})
  isDeleted: boolean;

  @Prop({default:null})
  image: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
