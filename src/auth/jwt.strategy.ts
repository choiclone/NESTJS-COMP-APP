import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: configService.get("JWT_ACCESS_SECRET_KEY"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOneBy({ username });

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}