import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    TypeOrmModule.forFeature([Board]),
    AuthModule
    // TypeOrmModule.forFeature([BoardRepository]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
