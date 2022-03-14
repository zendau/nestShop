import { Role } from './../../role/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Role, (Role) => Role.id, {
    cascade: true,
  })
  workerRole: Role[];
}
