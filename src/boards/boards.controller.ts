import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { isValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './DTO/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(
        private boardService: BoardsService
    ) { } // ts 덕분에 접근 제한자를 통한 코드 간소화가 가능함.

    @Get()
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`)
        return this.boardService.getAllBoards(user);
    }

    @Get('/:id')
    getBoardById(
        @Param('id') id:number
    ): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user:User
    ): Promise<Board> { 
        this.logger.verbose(`User ${user.username} creating a new board. Payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardService.createBoard(createBoardDto, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status);
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ):Promise<void> {
        return this.boardService.deleteBoard(id, user);
    }
}
