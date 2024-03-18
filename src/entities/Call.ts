import Address from '@entities/Address';
import Client from '@entities/Client';
import Service from '@entities/Service';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('call')
export default class Call {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  service_id: string;

  @OneToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column()
  client_id: string;

  @OneToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
