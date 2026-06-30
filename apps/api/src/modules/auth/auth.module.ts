import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';

import { PrismaModule } from '@app-prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    AuthRepository,
  ],

  exports: [AuthService],
})
export class AuthModule {}