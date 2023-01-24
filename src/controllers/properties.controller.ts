import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PropertiesService } from '../services';
import { CreatePropertyDto } from '../dtos/property/create-property.dto';
import { UpdatePropertyDto } from '../dtos/property/update-property.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationParams } from 'src/utils';

@Controller('property')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  async findAll(
    @Query() { limit, skip, status, location, type }: PaginationParams,
  ) {
    return await this.propertiesService.findAll({
      limit,
      skip,
      status,
      location,
      type,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return await this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.propertiesService.remove(id);
  }
}
