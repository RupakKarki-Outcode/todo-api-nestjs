import { USER_REPOSITORY } from 'src/constants/repositories';
import { User } from './user.entity';

export const usersProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
