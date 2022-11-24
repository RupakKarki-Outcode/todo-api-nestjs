import { Module } from '@nestjs/common';
import { TodoGroupController } from './todo-group.controller';
import { todoGroupProvider } from './todo-group.provider';
import { TodoGroupService } from './todo-group.service';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController, TodoGroupController],
  providers: [TodoGroupService, ...todoGroupProvider],
})
export class TodoModule {}
