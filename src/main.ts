import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(
    session({
      name: 'user-auth-session',
      secret: 'my_secret_key',
      resave: false,
      saveUninitialized: false, // this must be false (in the controler you can modify session so it be true)
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
