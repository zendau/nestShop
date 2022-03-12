import { Provider } from './../../provider/entities/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Waybill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  waybillName: string;

  @OneToMany(() => Provider, (Provider) => Provider.id)
  providerID: Provider[];

  //   @OneToMany(() => UserRole, (userRole) => userRole.user)
  //   recipientId  : UserRole[];
}
