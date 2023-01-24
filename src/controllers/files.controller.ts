import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FilesService } from '../services';
import { CreateFileDto } from '../dtos';
import { UpdateFileDto } from '../dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // TODO: Remake
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    
    return await this.filesService.uploadImage(file);
  }

  @Get('/:fileName')
  async getImage(@Res() res, @Param('fileName') fileName: string) {
    const image = await this.filesService.getImage(fileName);
    res.type(fileName.split('.')[1]);
    return res.send(image);
  }
}
