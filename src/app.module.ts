import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMAsyncConfig } from './configs/typeorm.config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: `./env/.env.dev`,
      validationSchema: Joi.object({
        JWT_ACCESS_SECRET_KEY: Joi.string().required(),
        JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_SECRET_KEY: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync(typeORMAsyncConfig),
    // TypeOrmModule.forRoot(typeORMConfig),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: configService.get('DB_HOST'),
    //       port: +configService.get<number>('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       database: configService.get('DB_DATABASE'),
    //       password: configService.get('DB_PASSWORD'),
    //       entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //       synchronize: false,
    //     };
    //   },
    // }),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
