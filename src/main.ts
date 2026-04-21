import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Resiliencia: Cierre elegante ante SIGTERM [20, 21]
  app.enableShutdownHooks(); 
  
  // Interceptores y Pipes globales
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Documentación OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API Agnóstica de Autenticación')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();