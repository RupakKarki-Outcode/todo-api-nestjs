import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // since the app is created using the NestFactory module, we can get the instance
  // of ConfigService as follows, the ConfigType provides types for the environment variables
  const configService = app.get<ConfigService<ConfigType>>(ConfigService);

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
