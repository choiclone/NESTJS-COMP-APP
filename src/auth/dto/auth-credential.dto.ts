import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    //영어 숫자만 가능하게 하는 정규식을 넣을 수 있음.
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "password only accepts english and number",
    })
    password: string;  
} 