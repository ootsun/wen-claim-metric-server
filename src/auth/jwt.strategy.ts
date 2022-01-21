import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor() {
        super({
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    // Whatever I return here will be available via req.user (controller (@Request())
    async validate(payload: any) {
        // I could retrieve the user from DB and return it instead of just returning the payload
        return payload;
    }
}
