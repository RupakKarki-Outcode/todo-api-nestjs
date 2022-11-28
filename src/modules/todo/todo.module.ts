import { Module } from '@nestjs/common';
import { TodoGroupController } from './controllers/todo-group.controller';
import { todoGroupProvider } from './database-providers/todo-group.provider';
import { TodoGroupService } from './services/todo-group.service';
import { TodoController } from './controllers/todo.controller';
import { todoProvider } from './database-providers/todo.provider';
import { TodoService } from './services/todo.service';

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
