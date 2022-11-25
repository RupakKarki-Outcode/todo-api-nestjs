import { Inject, Injectable } from '@nestjs/common';
import { TODO_REPOSITORY } from 'src/constants/repositories';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private todoRepository: typeof Todo,
  ) {}

  // creates a new todo
  async createTodo(todo: CreateTodoDto) {
    const newTodo = await this.todoRepository.create(todo);

    return newTodo;
  }

  // gets all todos within a todo group
  async getTodos(groupId: string) {
    const todos = await this.todoRepository.findAll({
      where: {
        todoGroupId: groupId,
      },
    });

    return todos;
  }

  // update todo
  async updateTodo(todoId: string, todo: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, row] = await this.todoRepository.update(
      { todo: todo },
      {
        where: {
          id: todoId,
        },
        returning: true,
      },
    );

    return row[0];
  }

  // get single todo
  async getTodo(todoId: string) {
    const todo = await this.todoRepository.findByPk(todoId);

    console.log('TODO', todo);

    return todo;
  }

  // delete todo
  async deleteTodo(todoId: string) {
    await this.todoRepository.destroy({ where: { id: todoId } });
  }
}
