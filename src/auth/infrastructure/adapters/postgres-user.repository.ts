// src/auth/infrastructure/adapters/postgres-user.repository.ts
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/ports/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PostgresUserRepository implements IUserRepository {
  // En un entorno de producción real, aquí inyectarías tu ORM (TypeORM, Prisma, etc.)
  // constructor(@InjectRepository(UserEntity) private readonly ormRepo: Repository<UserEntity>) {}

  // Base de datos simulada en memoria para probar el endpoint
  private readonly usersInDb: User[] = [
    new User(
      'uuid-1234-5678', 
      'usuario@ejemplo.com', 
      // Generamos un hash real para que el test de login funcione con 'SuperSecreta123!'
      bcrypt.hashSync('SuperSecreta123!', 10) 
    ),
  ];

  async findByEmail(email: string): Promise<User | null> {
    console.log(`[DB Adapter] Ejecutando query: SELECT * FROM users WHERE email = '${email}' LIMIT 1`);
    
    const user = this.usersInDb.find(u => u.email === email);
    
    if (!user) {
      return null;
    }

    // Retornamos una instancia de la Entidad de Dominio pura, no el objeto de base de datos
    return new User(user.id, user.email, user.passwordHash);
  }
}