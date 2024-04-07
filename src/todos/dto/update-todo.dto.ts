import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

import { CreateTodoRequestBody } from './create-todo.dto';

export class UpdateTodoRequestParams {
  @IsUUID()
  id: string;
}

export class UpdateTodoRequestBody extends PartialType(CreateTodoRequestBody) {
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateTodoResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  description: string;
  completed: boolean;
}
