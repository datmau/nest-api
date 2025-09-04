import { IsOptional, IsString } from "class-validator";

export class RoomMessageDto {

    @IsString()
    @IsOptional()
    room!: string;

    @IsString()
    @IsOptional()
    message!: string;
}
