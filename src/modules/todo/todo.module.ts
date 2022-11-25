import { Module } from '@nestjs/common';
import { TodoGroupController } from './todo-group.controller';
import { todoGroupProvider } from './todo-group.provider';
import { TodoGroupService } from './todo-group.service';
import { TodoController } from './todo.controller';
import { todoProvider } from './todo.provider';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController, TodoGroupController],
  providers: [
    TodoGroupService,
    TodoService,
    ...todoGroupProvider,
    ...todoProvider,
  ],
})
export class TodoModule {}
