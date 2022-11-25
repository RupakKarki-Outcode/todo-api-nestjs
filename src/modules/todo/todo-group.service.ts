import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TODO_GROUP_REPOSITORY } from 'src/constants/repositories';
import { CreateTodoGroupDto } from './dto/create-todogroup.dto';
import { UpdateTodoGroupDto } from './dto/update-todogroup.dto';
import { TodoGroup } from './entities/todo-group.entity';

@Injectable()
export class TodoGroupService {
  constructor(
    @Inject(TODO_GROUP_REPOSITORY)
    private todoGroupRepository: typeof TodoGroup,
  ) {}

  async getTodoGroups() {
    const todoGroups = await this.todoGroupRepository.findAll();

    return todoGroups;
  }

  async getTodoById(id: string) {
    const todoGroup = await this.todoGroupRepository.findByPk(id);

    if (!todoGroup) {
      throw new NotFoundException();
    }

    return todoGroup;
  }

  async createTodoGroup(todoGroup: CreateTodoGroupDto) {
    const newTodoGroup = await this.todoGroupRepository.create(todoGroup);

    return newTodoGroup;
  }

  async updateTodoGroup(id: string, todoGroup: UpdateTodoGroupDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, row] = await this.todoGroupRepository.update(
      { name: todoGroup.name },
      {
        where: {
          id: id,
        },
        returning: true,
      },
    );

    return row[0];
  }

  async deleteTodoGroup(id: string) {
    await this.todoGroupRepository.destroy({
      where: {
        id: id,
      },
    });
  }
}
