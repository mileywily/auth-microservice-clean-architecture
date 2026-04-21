// src/auth/infrastructure/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// 1. Controladores (Adaptadores de Entrada)
import { AuthController } from './controllers/auth.controller';

// 2. Casos de Uso (Capa de Aplicación)
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { ValidateUserUseCase } from '../application/use-cases/validate-user.usecase';

// 3. Puertos (Tokens de las Interfaces en el Dominio)
import { USER_REPOSITORY } from '../domain/ports/user.repository.interface';
import { AUTH_SERVICE } from '../domain/ports/auth.service.interface';

// 4. Adaptadores Concretos (Infraestructura y Persistencia)
import { PostgresUserRepository } from './adapters/postgres-user.repository';
import { JwtAuthService } from './adapters/jwt-auth.service';

@Module({
  imports: [
    // Configuración del módulo JWT de NestJS. 
    // Nota: Para producción real, es mejor usar JwtModule.registerAsync() 
    // para leer el JWT_SECRET desde el archivo env.validation.ts de forma asíncrona.
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'clave-secreta-de-desarrollo',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    // --- Capa de Casos de Uso ---
    // NestJS instanciará estas clases automáticamente como Singletons
    LoginUseCase,
    ValidateUserUseCase,

    // --- Capa de Inversión de Dependencias (Puertos y Adaptadores) ---
    // Aquí ocurre la magia de Clean Architecture:
    {
      // Cuando un Caso de Uso pida la interfaz USER_REPOSITORY...
      provide: USER_REPOSITORY,
      // ...NestJS le inyectará la implementación de PostgreSQL
      useClass: PostgresUserRepository, 
    },
    {
      // Cuando un Caso de Uso pida la interfaz AUTH_SERVICE...
      provide: AUTH_SERVICE,
      // ...NestJS le inyectará el adaptador de JWT
      useClass: JwtAuthService, 
    },
  ],
  exports: [
    // Exportamos el módulo de JWT o casos de uso si otros módulos (ej. UsersModule) los necesitan
    JwtModule
  ]
})
export class AuthModule {}