import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  DataType,
  IsEmail,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Unique
  @IsEmail
  @Column
  @ApiProperty()
  email: string;

  @Unique
  @Column
  @ApiProperty()
  username: string;

  @Column
  @ApiProperty()
  password: string;

  @Column({
    field: 'full_name',
  })
  @ApiProperty()
  fullName: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
