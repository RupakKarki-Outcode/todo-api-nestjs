import { Module } from '@nestjs/common';
import { TodoGroupController } from './controllers/todo-group.controller';
import { TodoGroupService } from './services/todo-group.service';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoGroup } from './entities/todo-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoGroup])],
  controllers: [TodoController, TodoGroupController],
  providers: [TodoGroupService, TodoService],
})
export class TodoModule {}
