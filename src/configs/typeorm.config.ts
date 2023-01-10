import { ConfigModule, ConfigService } from "@nestjs/config/dist";
import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm/dist/interfaces";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type: dbConfig.type || 'postgres',
            //사용할 데이터베이스 종류
            host: dbConfig.host || configService.get('DB_HOST'),
            port: dbConfig.port || +configService.get<number>('DB_PORT'),
            username: dbConfig.username || configService.get('DB_USERNAME'),
            database: dbConfig.database || configService.get('DB_DATABASE'),
            password: dbConfig.password || configService.get('DB_PASSWORD'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            //데이터베이스에 해당하는 entiry를 불러온다.
            synchronize: dbConfig.synchronize, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
        }
    }
}

// export const typeORMConfig: TypeOrmModuleOptions = {
//     type: dbConfig.type || 'postgres',
//     host: dbConfig.host || process.env.DB_HOST,
//     port: dbConfig.port || parseInt(process.env.DB_PORT, 10),
//     username: dbConfig.username || process.env.DB_USERNAME,
//     password: dbConfig.database || process.env.DB_DATABASE,
//     database: dbConfig.password || process.env.DB_PASSWORD,
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: true, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
// }