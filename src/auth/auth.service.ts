import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}
    
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void>{
        return this.userRepository.createUser(authCredentialDto);
    }
    
    async signIn(authCredentialDto: AuthCredentialDto): Promise<Object>{
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOneBy({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken: accessToken};
        }else{
            throw new UnauthorizedException('login failed');
        }
    }
}
