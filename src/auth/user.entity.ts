import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm"
import { Exclude } from "class-transformer";
import { Board } from "src/boards/board.entity";

@Entity()
@Unique(['username']) // username은 중복 되면 안된다. 
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    @Exclude()
    currentHashedRefreshToken?: string;

    @OneToMany(type => Board, board=>board.user, {eager: true, onDelete: 'CASCADE'})
    boards: Board[];
}