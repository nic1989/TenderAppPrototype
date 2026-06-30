import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from '@app-prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    PrismaService,
  ],
})
export class UsersModule {}