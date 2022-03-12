import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

//   @OneToMany(() => Category, (Category) => Category.name)
//   workerId: Category[];
}
