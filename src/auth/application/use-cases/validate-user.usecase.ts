import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { type IUserRepository, USER_REPOSITORY } from '../../domain/ports/user.repository.interface';
import { type IAuthService, AUTH_SERVICE } from '../../domain/ports/auth.service.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
  ) {}

  async execute(email: string, pass: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isValid = await this.authService.comparePasswords(pass, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

    return user;
  }
}