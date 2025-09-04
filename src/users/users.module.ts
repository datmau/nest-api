import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { AppService } from 'src/config/s3.config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [UsersController],
  providers: [UsersService, AppService],
  exports: [UsersService]
})
export class UsersModule {}
