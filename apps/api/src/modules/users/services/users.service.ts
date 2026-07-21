import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    try {
      return this.userRepository.findByEmail(email);
    } catch (err) {
        throw new BadRequestException(
          err?.meta?.cause ?? err?.message ?? 'Unknown Error',
      );
    }
  }

  async findById(id: string) {
    try {
      return this.userRepository.findById(id);
    } catch (err) {
        throw new BadRequestException(
          err?.meta?.cause ?? err?.message ?? 'Unknown Error',
      );
    }
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    organizationId?: string;
  }) {
    try {
      return this.userRepository.create(data);
    } catch (err) {
        throw new BadRequestException(
          err?.meta?.cause ?? err?.message ?? 'Unknown Error',
      );
    }
  }
}