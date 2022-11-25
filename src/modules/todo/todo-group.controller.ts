import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateTodoGroupDto } from './dto/create-todogroup.dto';
import { UpdateTodoGroupDto } from './dto/update-todogroup.dto';
import { TodoGroupService } from './todo-group.service';

@Controller('todo-group')
@ApiTags('todo-group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TodoGroupController {
  constructor(private todoGroupService: TodoGroupService) {}

  @Get()
  async getTodoGroups() {
    try {
      return this.todoGroupService.getTodoGroups();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async getTodoGroupById(@Param('id') id: string) {
    return this.todoGroupService.getTodoById(id);
  }

  @Post()
  @ApiBody({ type: CreateTodoGroupDto })
  async createTodoGroup(@Body() todoGroup: CreateTodoGroupDto) {
    try {
      return this.todoGroupService.createTodoGroup(todoGroup);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTodoGroupDto })
  async updateTodoGroup(
    @Param('id') id: string,
    @Body() todoGroup: UpdateTodoGroupDto,
  ) {
    try {
      return this.todoGroupService.updateTodoGroup(id, todoGroup);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async deleteTodoGroup(@Param('id') id: string) {
    try {
      return this.todoGroupService.deleteTodoGroup(id);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
