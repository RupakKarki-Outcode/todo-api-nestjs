import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // creates a new todo
  async createTodo(todo: CreateTodoDto) {
    const newTodo = this.todoRepository.create(todo);

    return newTodo;
  }

  // gets all todos within a todo group
  async getTodos(groupId: string) {
    const todos = await this.todoRepository.find({
      where: { todoGroup: { id: groupId } },
    });

    return todos;
  }

  // update todo
  async updateTodo(todoId: string, todo: string) {
    return await this.todoRepository.update({ id: todoId }, { todo: todo });
  }

  // get single todo
  async getTodo(todoId: string) {
    const todo = await this.todoRepository.findOneBy({ id: todoId });

    console.log('TODO', todo);

    return todo;
  }

  // delete todo
  async deleteTodo(todoId: string) {
    await this.todoRepository.delete({ id: todoId });
  }
}
