// test/auth.e2e-spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../src/auth/infrastructure/auth.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('AuthController (e2e) - Flujo de 5 posibles resultados', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({ imports: [AuthModule] }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Falla rápido [17]
    await app.init();
  });

  // 1. Éxito
  it('/auth/login (POST) - 200 OK: Retorna JWT', () => { /* ... */ });
  
  // 2. Error de Validación (Falla Rápido)
  it('/auth/login (POST) - 400 Bad Request: Body inválido', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'not-an-email' }) // Falta password y el email es inválido
      .expect(400);
  });

  // 3. Error de Autorización
  it('/auth/login (POST) - 401 Unauthorized: Credenciales incorrectas', () => { /* ... */ });
  
  // 4 y 5. Otros resultados como Rate Limit (429) o Internal Error simulados aquí...
});