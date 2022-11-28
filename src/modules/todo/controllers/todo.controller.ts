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
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('todo')
@ApiTags('todo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private todoService: TodoService) {}

  // Get all todos of a group
  @Get('/all/:groupId')
  @ApiProperty({ description: 'Get all todos of a group' })
  async getTodos(@Param('groupId') groupId: string) {
    try {
      return this.todoService.getTodos(groupId);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  // post a todo in a todo group
  @Post()
  @ApiBody({ type: CreateTodoDto })
  async createTodo(@Body() todo: CreateTodoDto) {
    try {
      return this.todoService.createTodo(todo);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  // edit todo
  @Patch(':id')
  @ApiBody({ type: UpdateTodoDto })
  async editTodo(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
    try {
      return this.todoService.updateTodo(id, todo.todo);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  // get a single todo
  @Get(':id')
  async getTodo(@Param('id') id: string) {
    try {
      return this.todoService.getTodo(id);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  // delete todo
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    try {
      return this.todoService.deleteTodo(id);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
