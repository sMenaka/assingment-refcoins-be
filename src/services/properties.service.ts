import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { Model } from 'mongoose';
import { type } from 'os';
import { Property, PropertyDocument } from 'src/entities/property.entity';
import { PaginationParams } from 'src/utils';
import { CreatePropertyDto } from '../dtos/property/create-property.dto';
import { UpdatePropertyDto } from '../dtos/property/update-property.dto';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'LKR',
});

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    try {
      const property = new this.propertyModel(createPropertyDto);
      property.price = formatter.format(createPropertyDto.price);
      return property.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: PaginationParams) {
    const findQuery = this.propertyModel
      .find({ isDeleted: false })
      .skip(params.skip);
    if (params.location && params.location !=="") findQuery.find({ location: params.location });
    if (params.status && params.status !=="") findQuery.find({ status: params.status });
    if (params.type && params.type !=="") findQuery.find({ type: params.type });
    if (params.limit) findQuery.limit(params.limit);
    findQuery.sort({ createdAt: -1 });
    return await findQuery;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyModel.updateOne(
      { id },
      { $set: { image: updatePropertyDto.image } },
    );
    
  }

  async remove(id: string) {
    try {
      await this.propertyModel.updateOne({ id }, { $set: { isDeleted: true } });
      return `This action removes a #${id} property`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
