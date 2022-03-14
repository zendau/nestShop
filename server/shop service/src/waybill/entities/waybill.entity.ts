import { Provider } from './../../provider/entities/provider.entity';
import { Worker } from './../../worker/entities/worker.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Waybill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  waybillName: string;

  @ManyToOne(() => Provider, (Provider) => Provider.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'providerId' })
  providerId: Provider;

  @ManyToOne(() => Worker, (Worker) => Worker.workerId, {
    cascade: true,
  })
  @JoinColumn({ name: 'recipientId' })
  recipientId: Worker;
}
