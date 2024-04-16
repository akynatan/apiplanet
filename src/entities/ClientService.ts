import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Address from './Address';
import Client from './Client';
import Service from './Service';
import Interface from './Interface';
import InterfaceRouting from './InterfaceRouting';
import EquipamentConnection from './EquipamentConnection';
import EquipamentRouting from './EquipamentRouting';

@Entity('client_service')
export default class ClientService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_client_service_external: number;

  @Column()
  status_prefix: string;

  @Column()
  enabled_in: string;

  @Column()
  technology: string;

  @Column({ nullable: true })
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ nullable: true })
  service_id: string;

  @OneToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ nullable: true })
  client_id: string;

  @OneToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ nullable: true })
  interface_id: string;

  @OneToOne(() => Interface)
  @JoinColumn({ name: 'interface_id' })
  interface: Interface;

  @Column({ nullable: true })
  interface_routing_id: string;

  @OneToOne(() => InterfaceRouting)
  @JoinColumn({ name: 'interface_routing_id' })
  interface_routing: InterfaceRouting;

  @Column({ nullable: true })
  equipament_connection_id: string;

  @OneToOne(() => EquipamentConnection)
  @JoinColumn({ name: 'equipament_connection_id' })
  equipament_connection: EquipamentConnection;

  @Column({ nullable: true })
  equipament_routing_id: string;

  @OneToOne(() => EquipamentRouting)
  @JoinColumn({ name: 'equipament_routing_id' })
  equipament_routing: EquipamentRouting;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
