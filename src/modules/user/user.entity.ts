import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  IsEmail,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column({
    field: 'full_name',
  })
  full_name: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date;
}
