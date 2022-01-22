import { User } from './../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => User, (user) => user.id)
  userId: User[];

  @Column()
  refreshToken: string;
}
