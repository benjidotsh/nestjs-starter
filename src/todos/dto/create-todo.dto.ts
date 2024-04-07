import { IsString } from 'class-validator';

export class CreateTodoRequestBody {
  @IsString()
  description: string;
}

export class CreateTodoResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  description: string;
  completed: boolean;
}
