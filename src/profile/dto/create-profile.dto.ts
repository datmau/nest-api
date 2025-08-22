import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    username?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    bio?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    avatarUrl?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    facebookUrl?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    xUrl?: string;

}
