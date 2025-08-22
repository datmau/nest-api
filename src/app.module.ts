import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { DataSource } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { ProfileEntity } from './profile/entities/profile.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'bduser',
      password: process.env.DB_PASSWORD || 'user123',
      database: process.env.DB_DATABASE || 'nest',
      entities: [UserEntity, ProfileEntity, PostEntity],
      synchronize: true,
    }),
    UsersModule,
    ProfileModule,
    PostsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
