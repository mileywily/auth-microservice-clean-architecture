// src/auth/infrastructure/controllers/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { LoginDto } from '../../application/dtos/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Inicia sesión y obtiene un JWT' })
  @ApiResponse({ status: 200, description: 'Login exitoso.' })
  @ApiResponse({ status: 400, description: 'Error de validación de datos.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @ApiResponse({ status: 429, description: 'Demasiadas peticiones (Rate Limit).' })
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
}