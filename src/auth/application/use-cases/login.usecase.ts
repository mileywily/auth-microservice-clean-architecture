import { Injectable, Inject } from '@nestjs/common';
import { ValidateUserUseCase } from './validate-user.usecase';
import { type IAuthService, AUTH_SERVICE } from '../../domain/ports/auth.service.interface';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private validateUserUseCase: ValidateUserUseCase,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
  ) {}

  async execute(dto: LoginDto): Promise<{ accessToken: string }> {
    // 1. Identidad validada (SRP: delegada a otro caso de uso)
    const user = await this.validateUserUseCase.execute(dto.email, dto.password);
    
    // 2. Emisión de token (SRP: delegada al puerto abstracto)
    const token = await this.authService.generateToken({ id: user.id, email: user.email });
    return { accessToken: token };
  }
}