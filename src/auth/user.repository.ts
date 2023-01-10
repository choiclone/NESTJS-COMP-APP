import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CustomRepository } from "src/repository/custom.repository";
import { Repository } from "typeorm"
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        
        const salt = await bcrypt.genSalt();
        const hashedPasswd = await bcrypt.hash(password, salt); // bcrypt.compare(비교 password, 사용자 테이블에 저장된 password);
        const user = this.create({
            username,
            password: hashedPasswd,
        })

        try{
            await this.save(user);
        }catch (e) {
            if(e.code == '23505'){
                throw new ConflictException('Existing username');
            }else {
                throw new InternalServerErrorException();
            }
        }
    }
}