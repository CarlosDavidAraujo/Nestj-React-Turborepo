import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';
import { contract } from '@repo/contracts';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.API_PORT!;

if (!PORT) {
  throw new Error('Nenhuma porta foi especificada');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = generateOpenApi(contract, {
    info: {
      title: 'Posts API',
      version: '1.0.0',
    },
  });

  SwaggerModule.setup('swagger', app, document);

  app.use(cookieParser());

  await app.listen(PORT);
}
bootstrap();
