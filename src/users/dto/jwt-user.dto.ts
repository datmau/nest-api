import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProfileEntity } from "src/profile/entities/profile.entity";
import { UserRole } from "../entities/user.entity";

export class JWTUserDto {
    userId: string;
    email: string;
    role?: UserRole;
}
