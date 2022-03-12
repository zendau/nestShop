import { Merchandise } from './../../merchandise/entities/merchandise.entity';
import { Waybill } from './../../waybill/entities/waybill.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Stockcontrolcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  salePrice: number;

  @Column()
  arrivedDate: Date;
  
  @Column()
  issueDate: Date;

  @Column()
  place: string;

  @OneToMany(() => Waybill, (Waybill) => Waybill.id)
  waybillId: number;

  @OneToMany(() => Merchandise, (Merchandise) => Merchandise.id)
  MerchandiseId: number;

//   @OneToMany(() => UserRole, (userRole) => userRole.user)
//   storageId: number;

//   @OneToMany(() => UserRole, (userRole) => userRole.user)
//   saleId: number;
}
