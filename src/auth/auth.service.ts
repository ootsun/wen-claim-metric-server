import { Injectable } from '@nestjs/common';
import {User} from '../user/user.entity';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    login(user: User) {
        return this.createToken(user);
    }

    refreshToken(user: User) {
        return this.createToken(user);
    }

    createToken(user: User) {
        const payload = {id: user.id, username: user.username};
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
