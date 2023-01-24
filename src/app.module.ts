import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './modules';
import { FilesModule } from './modules';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), PropertiesModule, FilesModule,
    MongooseModule.forRoot(process.env.DB_HOST)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
