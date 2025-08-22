import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreatePostDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    publishedAt?: Date;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    authorId?: string;
}
