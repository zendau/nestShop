import { Sale } from '../../sale/entities/sale.entity';
import { Storage } from '../../storage/entities/storage.entity';
import { Merchandise } from '../../merchandise/entities/merchandise.entity';
import { Waybill } from '../../waybill/entities/waybill.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

  @Column({ nullable: true })
  issueDate: Date;

  @Column()
  place: string;

  @ManyToOne(() => Waybill, (Waybill) => Waybill.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'waybillId' })
  waybillId: Waybill;

  @ManyToOne(() => Merchandise, (Merchandise) => Merchandise.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'MerchandiseId' })
  MerchandiseId: Merchandise;

  @ManyToOne(() => Storage, (Storage) => Storage.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'storageId' })
  storageId: Storage;

  @ManyToOne(() => Sale, (Sale) => Sale.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'saleId' })
  saleId: Sale;
}
