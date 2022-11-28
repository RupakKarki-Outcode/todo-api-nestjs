import { TODO_REPOSITORY } from 'src/constants/repositories';
import { Todo } from '../entities/todo.entity';

export const todoProvider = [
  {
    provide: TODO_REPOSITORY,
    useValue: Todo,
  },
];
