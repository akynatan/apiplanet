import City from '@entities/City';

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('address')
export default class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  neighborhood: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  number: string;

  @Column()
  city_id: string;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
