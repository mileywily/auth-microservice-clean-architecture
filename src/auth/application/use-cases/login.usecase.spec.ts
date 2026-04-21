// src/auth/application/use-cases/login.usecase.spec.ts
import { LoginUseCase } from './login.usecase';
import { ValidateUserUseCase } from './validate-user.usecase';
import { IAuthService } from '../../domain/ports/auth.service.interface';
import { User } from '../../domain/entities/user.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockValidateUser: jest.Mocked<ValidateUserUseCase>;
  let mockAuthService: jest.Mocked<IAuthService>;

  beforeEach(() => {
    // Arrange: Configuración inicial aislada de framework/DB
    mockValidateUser = { execute: jest.fn() } as any;
    mockAuthService = { generateToken: jest.fn(), comparePasswords: jest.fn() };
    useCase = new LoginUseCase(mockValidateUser, mockAuthService);
  });

  it('Should validate identity and return a JWT access token', async () => {
    // Arrange
    const mockUser = new User('1', 'test@test.com', 'hash');
    mockValidateUser.execute.mockResolvedValue(mockUser);
    mockAuthService.generateToken.mockResolvedValue('jwt-token-123');

    // Act
    const result = await useCase.execute({ email: 'test@test.com', password: 'pass' });

    // Assert
    expect(mockValidateUser.execute).toHaveBeenCalledWith('test@test.com', 'pass');
    expect(mockAuthService.generateToken).toHaveBeenCalledWith({ id: '1', email: 'test@test.com' });
    expect(result).toEqual({ accessToken: 'jwt-token-123' });
  });
});