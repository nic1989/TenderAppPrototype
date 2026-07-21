import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from '@app-prisma/prisma.service';
import { PrismaModule } from '@app-prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    PrismaService,
  ],
  exports: [
    UsersService,
    UserRepository, // <-- Export this
  ],
})
export class UsersModule {}