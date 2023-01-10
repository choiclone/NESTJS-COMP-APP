import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    // @UsePipes(ValidationPipe) Handler-level Pipes
    signUp(
        @Body(ValidationPipe) // Parameter-Level Pipes
        authCredentialDto: AuthCredentialDto
    ): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe)
        authCredentialDto: AuthCredentialDto
    ): Promise<Object>{
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        return {"status": "200"}
    }
}
