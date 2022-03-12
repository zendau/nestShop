import { Category } from './../../category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Merchandise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Category, (Category) => Category.name, {
    cascade: true,
  })
  category: Category[];

  @Column()
  image: string;

  @Column()
  description: string;
}
