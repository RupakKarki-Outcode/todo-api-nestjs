import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoGroupDto {
  @ApiProperty()
  name: string;
}
