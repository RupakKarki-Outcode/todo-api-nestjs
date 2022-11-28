import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { TodoGroup } from './todo-group.entity';

@Table({
  tableName: 'todo',
})
export class Todo extends Model<Todo> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.TEXT,
  })
  todo: string;

  @ForeignKey(() => TodoGroup)
  @Column({ field: 'todo_group_id', type: DataType.UUID })
  todoGroupId: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
