import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoGroupDto {
  @ApiProperty()
  name: string;
}
