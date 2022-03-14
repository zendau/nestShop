import { Role } from './../../role/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  workerId: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  birtday: Date;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  salary: number;

  @ManyToOne(() => Role, (Role) => Role.id, {
    cascade: true,
  })
  workerRole: Role;
}
