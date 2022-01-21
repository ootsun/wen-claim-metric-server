import {Module} from '@nestjs/common';
import {LocalStrategy} from './local.strategy';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_VALIDITY_DURATION
            }
        }
    )],
    providers: [
        LocalStrategy,
        AuthService,
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
