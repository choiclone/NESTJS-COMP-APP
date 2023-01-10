import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './DTO/create-board.dto';
import { BoardRepository } from './board.repository';
// import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable() // 주입가능 데코레이터
export class BoardsService {
    constructor(
        // @InjectRepository(BoardRepository) 커스텀 리포지터리는 리포지터리 주입을 넣지 않도록 한다.
        private boardRepository: BoardRepository
    ) { }

    getAllBoards(user: User): Promise<Board[]> {
        return this.boardRepository.getAllBoards(user);
    }

    getBoardById(id: number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        return this.boardRepository.updateBoardStatus(id, status);
    }

    deleteBoard(id: number, user: User): Promise<void> {
        return this.boardRepository.deleteBoard(id, user);
    }
}
