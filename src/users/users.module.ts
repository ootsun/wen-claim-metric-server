import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {UserController} from './user.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ],
    controllers: [
        UserController
    ]
})
export class UsersModule {
}
