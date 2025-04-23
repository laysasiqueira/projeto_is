import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'https://studio.apollographql.com',
        'http://localhost:7000',            
      ],
      credentials: true,
  }}
);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();
