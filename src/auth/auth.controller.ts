import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto, ProfileResponseDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'User logged in successfully', type: LoginResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: 200, description: 'Return user profile', type: ProfileResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Admin endpoint (protected)' })
    @ApiResponse({ status: 200, description: 'Admin data', type: ProfileResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiBearerAuth()
    getAdmin(@Request() req) {
        return req.user;
    }
}