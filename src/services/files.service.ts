import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createWriteStream, readFileSync } from 'fs';
import { CreateFileDto } from '../dtos/file/create-file.dto';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async getImage(fileName: string) {
    const image = await readFileSync(`assets/${fileName}`);
    if (!image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
    return image;
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const imageSaveName = `prop-${Date.now()}.${file.originalname.split(".")[1]}`;
      const streamWriter = createWriteStream(
        `assets/${imageSaveName}`,
      );
      await streamWriter.write(file.buffer);
      if(process.env.NODE_ENV === "local"){
        return `http://localhost:${process.env.PORT}/file/${imageSaveName}`
      }
      else{
        return `${process.env.BASE_URL}/file/${imageSaveName}`
      }
       
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
