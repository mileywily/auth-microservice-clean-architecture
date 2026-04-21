import { Module } from '@nestjs/common';
import { AuthModule } from './auth/infrastructure/auth.module'; 

@Module({
  imports: [AuthModule], // <-- ¡Debe estar aquí!
  controllers: [],
  providers: [],
})
export class AppModule {}