import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BaseRepository } from './base.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, BaseRepository],
  controllers: [UserController],
})
export class UserModule {}
