import {Column, ObjectIdColumn} from 'typeorm';

export class User {
    @ObjectIdColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({default: 0})
    failedLoginAttempts: number;
}
