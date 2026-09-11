import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.authRepository.findByEmail(dto.email);
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.authRepository.create({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        ...(dto.organizationId && {
          organizationId: dto.organizationId,
      }),
      });

      return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.authRepository.findByEmail(dto.email);

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const passwordMatched = await bcrypt.compare(
        dto.password,
        user.password,
      );

      if (!passwordMatched) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        name: user.name
      };

      return {
        accessToken: await this.jwtService.signAsync(payload),
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }

  async getCurrentUser(userId: string) {
    try {
      const user = await this.authRepository.findById(userId);

      if (!user) {
        throw new UnauthorizedException();
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        organizationId: user.organizationId,
      };
    } catch (err) {
        throw new BadRequestException(
            err?.meta?.cause ?? err?.message ?? 'Unknown Error',
        );
    }
  }
}