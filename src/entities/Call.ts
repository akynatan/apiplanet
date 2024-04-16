import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import ClientService from './ClientService';

@Entity('call')
export default class Call {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  client_service_id?: string;

  @OneToOne(() => ClientService)
  @JoinColumn({ name: 'client_service_id' })
  client_service: ClientService;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
