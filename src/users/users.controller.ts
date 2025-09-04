import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { User } from 'src/auth/user.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JWTUserDto } from './dto/jwt-user.dto';
import { AppService } from 'src/config/s3.config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly appService: AppService
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('Creating user with DTO:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/profile')
  //@UseGuards(JwtAuthGuard)
  //@Roles('ADMIN', 'USER')
  //@UseGuards(RolesGuard)
  findProfile(@Param('id') id: string) {
    return this.usersService.findOneWithProfile(id);
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('imagen'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @User('user') user: JWTUserDto,
  ) {
    if (!file) {
      throw new NotFoundException('File not found');
    }

    await this.appService.uploadFile(file);

    await this.usersService.updateAvatar(user.userId, file.filename);

    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      user,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
