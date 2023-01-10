import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { CustomRepository } from "src/repository/custom.repository";
import { Repository } from "typeorm"
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./DTO/create-board.dto";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board>{
    async getAllBoards(
        user: User
    ): Promise<Board[]> {
        const query = this.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId: user.id});

        const boards = await query.getMany();

        return boards;
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {
        const { title, description } = createBoardDto;
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })
        await this.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.findOneBy({id});

        if(!found) {
         throw new NotFoundException(`Can't find Board with id ${id}`);   
        }

        return found;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.save(board);
        return board;
    }
/*
    delete(
        criteria: string | string[] | number | number[] | Date | Date[] 
        | ObjectID | ObjectID[] | FindOptionsWhere<Entity>
    ): Promise<DeleteResult>;
*/
    async deleteBoard(id: number, user: User): Promise<void> {
        // const result1 = await this.delete({id, user});
        const result2 = 
            await this.createQueryBuilder()
                .delete()
                .from(Board)
                .where("id = :id", {id})
                .andWhere("userId = :userId", {userId: user.id})
                .execute();
        // const result = await this.delete({id, user});

        if(result2.affected == 0){ // affected는 delete 함수를 통해 확인할 경우 0이면 없는 값이며, 있는 값이면 1이다.
            throw new NotFoundException(`Can't find Board id ${id}`);
        }
    }
}