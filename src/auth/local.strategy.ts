import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {User} from '../user/user.entity';
import {UserService} from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly usersService: UserService
    ) {
        super();
    }

    // Whatever I return here will be available via req.user (controller (@Request())
    async validate(username: string, password: string): Promise<User> {
        const user = await this.usersService.findOne(username);
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
