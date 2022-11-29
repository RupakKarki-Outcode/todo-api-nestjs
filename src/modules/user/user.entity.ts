import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email' })
  @ApiProperty()
  @IsEmail()
  email: string;

  @Column({ name: 'username' })
  @ApiProperty()
  username: string;

  @Column({ select: false })
  @ApiProperty()
  password: string;

  @Column({
    name: 'full_name',
  })
  @ApiProperty()
  fullName: string;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
