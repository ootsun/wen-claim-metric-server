import {Column, Entity, ObjectIdColumn} from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({default: 0})
    failedLoginAttempts: number;
}
