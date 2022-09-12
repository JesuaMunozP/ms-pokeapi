import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  var express = require('express');
  var responseTime = require('response-time');
  app.setGlobalPrefix('api');
  app.use(responseTime());
  await app.listen(3000);
}
bootstrap();
