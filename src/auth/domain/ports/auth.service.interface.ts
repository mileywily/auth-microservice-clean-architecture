export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
export interface IAuthService {
  generateToken(payload: { id: string; email: string }): Promise<string>;
  comparePasswords(plain: string, hash: string): Promise<boolean>;
}