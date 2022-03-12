import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

//   @OneToMany(() => Category, (Category) => Category.name)
//   workerRole: Category[];
}
