import { Worker } from './../../worker/entities/worker.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @ManyToMany(() => Worker, (Worker) => Worker.workerId, {
    cascade: true,
  })
  @JoinTable()
  workerId: Worker[];
}
