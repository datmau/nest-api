import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { DataSource } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { ProfileEntity } from './profile/entities/profile.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { TagEntity } from './tags/entities/tag.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'bduser1',
      password: process.env.DB_PASSWORD || 'user1231',
      database: process.env.DB_DATABASE || 'nest1',
      entities: [UserEntity, ProfileEntity, PostEntity, TagEntity],
      synchronize: true,
    }),
    UsersModule,
    ProfileModule,
    PostsModule,
    AuthModule,
    TagsModule
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
