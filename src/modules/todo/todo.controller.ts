import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {}
