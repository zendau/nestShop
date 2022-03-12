import { Sale } from './../../sale/entities/sale.entity';
import { Storage } from './../../storage/entities/storage.entity';
import { Merchandise } from './../../merchandise/entities/merchandise.entity';
import { Waybill } from './../../waybill/entities/waybill.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

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

  @OneToMany(() => Waybill, (Waybill) => Waybill.id, {
    cascade: true,
  })
  waybillId: number;

  @OneToMany(() => Merchandise, (Merchandise) => Merchandise.id, {
    cascade: true,
  })
  MerchandiseId: number;

  @OneToMany(() => Storage, (Storage) => Storage.id, {
    cascade: true,
  })
  storageId: Storage[];

  @Column({
    nullable: true,
  })
  saleId: number;

  @OneToMany(() => Sale, (Sale) => Sale.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'saleId' })
  sale: Sale[];
}
