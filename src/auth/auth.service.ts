import { Injectable } from '@nestjs/common';
import {User} from '../user/user.entity';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    async login(user: User) {
        const payload = {id: user.id, email: user.email};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async refreshToken(user: User) {
        return {
            token: this.jwtService.sign(user)
        }
    }
}
