import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly usersService: UsersService
    ) {
        super();
    }

    // Whatever I return here will be available via req.user (controller (@Request())
    async validate(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOne(email);
        if (!user) {
            throw new NotFoundException();
        }
        if (user.failedLoginAttempts >= Number.parseInt(process.env.FAILED_LOGIN_MAX_ATTEMPTS)) {
            throw new ForbiddenException('Max number of failed attempts reached');
        }
        if (!await bcrypt.compare(password, user.password)) {
            user.failedLoginAttempts++;
            await this.usersService.update(user);
            throw new NotFoundException('Provided email and password do not match');
        }
        if (user.failedLoginAttempts !== 0) {
            user.failedLoginAttempts = 0;
            await this.usersService.update(user);
        }
        return user;
    }
}
