import { Controller, Get } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UserRepository) {}

  @Get()
  async getUsers() {
    return this.users.findAll();
  }
}