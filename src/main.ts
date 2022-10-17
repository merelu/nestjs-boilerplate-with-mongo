import { AllExceptionFilter } from '@infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from '@infrastructure/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from '@infrastructure/common/interceptors/response.interceptor';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);
  // filters
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor(new LoggerService()));

  app.setGlobalPrefix('v1');

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Boilerplate-nest-mongodb-server')
      .setDescription('this server is nestjs, mongodb boilerplate')
      .setVersion('1.0')
      .setExternalDoc('스웨거 JSON', '/v1/doc-json')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('doc', app, document, {
      useGlobalPrefix: true,
      customCssUrl: '/static/swagger-material.css',
      customSiteTitle: 'boilerplate-swagger',
      customfavIcon: '/static/favicon.ico',
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  await app.listen(8100);
}
bootstrap();
