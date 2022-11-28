import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  todo: string;
  @ApiProperty()
  todoGroupId: string;
}
