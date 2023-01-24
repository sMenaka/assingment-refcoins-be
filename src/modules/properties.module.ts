import { Module } from '@nestjs/common';
import { PropertiesService } from '../services/properties.service';
import { PropertiesController } from '../controllers/properties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from 'src/entities/property.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: Property.name,schema: PropertySchema}])],
  controllers: [PropertiesController],
  providers: [PropertiesService]
})
export class PropertiesModule {}
