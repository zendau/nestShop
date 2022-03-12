import { Provider } from './../../provider/entities/provider.entity';
import { Worker } from './../../worker/entities/worker.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Waybill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  waybillName: string;

  @OneToMany(() => Provider, (Provider) => Provider.id, {
    cascade: true,
  })
  providerID: Provider[];

  @OneToMany(() => Worker, (Worker) => Worker.workerId, {
    cascade: true,
  })
  recipientId: Worker[];
}
