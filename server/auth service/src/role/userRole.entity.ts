import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  @Column()
  userId: number;

  @ManyToMany(() => Role)
  @JoinTable()
  @Column()
  roleId: number;
}
