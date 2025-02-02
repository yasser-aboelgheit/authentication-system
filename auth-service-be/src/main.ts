
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
      });
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
   Logger.log('Application is runninggg on: http://localhost:3000', 'Bootstrap');
}
bootstrap();
