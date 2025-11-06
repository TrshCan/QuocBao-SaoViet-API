import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT ?? 3001}`);
  console.log(`http://localhost:${process.env.PORT ?? 3001}`);
}

void bootstrap();
