import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../common';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', unique: true })
  @ApiProperty()
  @IsEmail()
  email: string;

  @Column({ name: 'username', unique: true })
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({
    name: 'full_name',
  })
  @ApiProperty()
  fullName: string;

  @Column()
  address: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({
    type: 'timestamp',
    onUpdate: '() => CURRENT_TIMESTAMP',
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date;
}
