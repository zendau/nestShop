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
  ManyToOne,
} from 'typeorm';

@Entity()
export class StockControlCard {
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

  @ManyToOne(() => Waybill, (Waybill) => Waybill.id, {
    cascade: true,
  })
  waybillId: Waybill;

  @ManyToOne(() => Merchandise, (Merchandise) => Merchandise.id, {
    cascade: true,
  })
  MerchandiseId: Merchandise;

  @ManyToOne(() => Storage, (Storage) => Storage.id, {
    cascade: true,
  })
  storageId: Storage;

  @ManyToOne(() => Sale, (Sale) => Sale.id, {
    cascade: true,
  })
  saleId: Sale;
}
