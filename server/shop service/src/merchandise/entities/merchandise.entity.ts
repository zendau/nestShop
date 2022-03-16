import { Category } from './../../category/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Merchandise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (Category) => Category.name, {
    cascade: true,
  })
  @JoinColumn({ name: 'categoryId' })
  categoryId: Category;

  @Column()
  image: string;

  @Column()
  description: string;
}
