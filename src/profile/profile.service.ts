import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOne(id: string) {
    return this.profileRepository.findBy({ id });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    await this.profileRepository.update(id, updateProfileDto);
    return this.profileRepository.findOneBy({ id });
  }
}
