import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {LocalAuthGuard} from '../auth/local-auth.guard';
import {AuthService} from '../auth/auth.service';

@Controller("/users")
export class UserController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('refresh-token')
    refreshToken(@Request() req): any {
        return this.authService.refreshToken(req.user);
    }
}
