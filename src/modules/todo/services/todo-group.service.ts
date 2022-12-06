import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoGroupDto } from '../dto/create-todogroup.dto';
import { UpdateTodoGroupDto } from '../dto/update-todogroup.dto';
import { TodoGroup } from '../entities/todo-group.entity';

@Injectable()
export class TodoGroupService {
  constructor(
    @InjectRepository(TodoGroup)
    private todoGroupRepository: Repository<TodoGroup>,
  ) {}

  async getTodoGroups() {
    const todoGroups = await this.todoGroupRepository.find();

    return todoGroups;
  }

  async getTodoById(id: string) {
    const todoGroup = await this.todoGroupRepository.findOneBy({ id: id });

    if (!todoGroup) {
      throw new NotFoundException();
    }

    return todoGroup;
  }

  async createTodoGroup(todoGroup: CreateTodoGroupDto) {
    const newTodoGroup = this.todoGroupRepository.save(todoGroup);

    return newTodoGroup;
  }

  async updateTodoGroup(id: string, todoGroup: UpdateTodoGroupDto) {
    const updated = await this.todoGroupRepository.update(
      { id: id },
      { name: todoGroup.name },
    );
    return updated;
  }

  async deleteTodoGroup(id: string) {
    await this.todoGroupRepository.delete({ id: id });
  }
}
