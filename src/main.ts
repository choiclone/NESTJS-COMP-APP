import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ServiceConfig = config.get('server')
  
  await app.listen(process.env.LOCAL_PORT);
  Logger.log(`Application running on Port ${ServiceConfig.port}`);
}
bootstrap();
