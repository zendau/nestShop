import { Merchandise } from './../../merchandise/entities/merchandise.entity';
import { Worker } from './../../worker/entities/worker.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Merchandise, (Merchandise) => Merchandise.id, {
    cascade: true,
  })
  merchandiseId: Merchandise[];

  @Column()
  dateOfSale: Date;

  @Column()
  emailOfBuyer: string;

  @Column()
  count: number;

  @OneToMany(() => Worker, (Worker) => Worker.workerId, {
    cascade: true,
  })
  workerId: Worker[];
}
