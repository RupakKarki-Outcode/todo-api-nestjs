// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require('morgan');
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.use(morgan('tiny'));

  // since the app is created using the NestFactory module, we can get the instance
  // of ConfigService as follows, the ConfigType provides types for the environment variables
  const configService = app.get<ConfigService<ConfigType>>(ConfigService);

  // securing swagger
  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_USER')]:
          configService.get('SWAGGER_PASSWORD'),
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(configService.get('GLOBAL_PREFIX'));
  // to setup swagger, a document needs to be created and built first
  // the document builder builds the configurations for the swagger
  const config = new DocumentBuilder()
    .setTitle('Todo & Notes Api')
    .setDescription('The todo & Notes API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // the swagger module creates a document and sets it up on the given route
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('SWAGGER_ROUTE'), app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
