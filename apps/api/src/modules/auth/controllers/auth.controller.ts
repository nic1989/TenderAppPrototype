import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('test')
    test() {
        return {
            message: 'Auth module working',
        };
    }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        console.log('controller')
        return this.authService.register(dto);
    }
}