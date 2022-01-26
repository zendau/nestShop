import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  value: string;

  @Column()
  desc: string;
}
