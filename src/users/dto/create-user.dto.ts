import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProfileEntity } from "src/profile/entities/profile.entity";

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}
