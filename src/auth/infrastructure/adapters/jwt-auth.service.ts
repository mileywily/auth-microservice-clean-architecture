// src/auth/infrastructure/adapters/jwt-auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../../domain/ports/auth.service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtAuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: { id: string; email: string }): Promise<string> {
    // Usamos el módulo oficial de NestJS para firmar el token de forma asíncrona
    return this.jwtService.signAsync(payload);
  }

  async comparePasswords(plain: string, hash: string): Promise<boolean> {
    // Delegamos la verificación criptográfica a bcrypt
    return bcrypt.compare(plain, hash);
  }
}