import { Merchandise } from './../../merchandise/entities/merchandise.entity';
import { Worker } from './../../worker/entities/worker.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Merchandise, (Merchandise) => Merchandise.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'merchandiseId' })
  merchandiseId: Merchandise;

  @Column()
  dateOfSale: Date;

  @Column()
  emailOfBuyer: string;

  @Column()
  count: number;

  @ManyToOne(() => Worker, (Worker) => Worker.workerId, {
    cascade: true,
  })
  @JoinColumn({ name: 'workerId' })
  workerId: Worker;
}
