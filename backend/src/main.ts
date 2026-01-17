import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  
  app.enableCors({
    origin: [
      frontendUrl, 
      'http://localhost:3000',
      'https://contabil-qpq51hbcl-leons-projects-9b7ab63c.vercel.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
