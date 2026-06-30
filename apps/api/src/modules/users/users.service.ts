import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    organizationId?: string;
  }) {
    return this.userRepository.create(data);
  }
}