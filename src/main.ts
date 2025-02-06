import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Course Management API')
    .setDescription('API for managing courses, students, and grades')
    .setVersion('1.0')
    .addTag('courses')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
void bootstrap();

// create CRUD for all entity's
// grade report for students
// create entity: teacher - done
