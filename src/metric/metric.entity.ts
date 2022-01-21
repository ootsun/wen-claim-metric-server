import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Metric {
    @ObjectIdColumn()
    id: number;
    @Column()
    date: Date;
    @Column()
    sessionId: string;
    @Column()
    amount: number;
    @Column()
    apr: number;
    @Column()
    cost: number;
}
