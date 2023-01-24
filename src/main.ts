import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const fs = require('fs');
  const dir = 'assets/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
