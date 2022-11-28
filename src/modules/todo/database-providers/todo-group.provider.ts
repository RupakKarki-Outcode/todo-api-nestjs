import { TODO_GROUP_REPOSITORY } from 'src/constants/repositories';
import { TodoGroup } from '../entities/todo-group.entity';

export const todoGroupProvider = [
  {
    provide: TODO_GROUP_REPOSITORY,
    useValue: TodoGroup,
  },
];
