import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoGroup } from './todo-group.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  todo: string;

  @ManyToOne(() => TodoGroup, (todoGroup) => todoGroup.todos)
  todoGroup: TodoGroup;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date;
}
