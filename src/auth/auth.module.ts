import {forwardRef, Module} from '@nestjs/common';
import {LocalStrategy} from './local.strategy';
import {UserModule} from '../user/user.module';
import {PassportModule} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import {ConfigService} from '@nestjs/config';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_VALIDITY_DURATION'),
                    },
                };
            },
            inject: [ConfigService],
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
