import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateTodoRequestBody,
  CreateTodoResponse,
} from './dto/create-todo.dto';
import { FindAllTodosResponse } from './dto/find-all-todos.dto';
import { FindOneTodoResponse } from './dto/find-one-todos.dto';
import { RemoveTodoResponse } from './dto/remove-todo.dto';
import {
  UpdateTodoRequestBody,
  UpdateTodoRequestParams,
  UpdateTodoResponse,
} from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() body: CreateTodoRequestBody): Promise<CreateTodoResponse> {
    return this.todosService.create(body);
  }

  @Get()
  findAll(): Promise<FindAllTodosResponse[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Todo not found' })
  findOne(@Param('id') id: string): Promise<FindOneTodoResponse> {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() params: UpdateTodoRequestParams,
    @Body() body: UpdateTodoRequestBody,
  ): Promise<UpdateTodoResponse> {
    return this.todosService.update(params.id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<RemoveTodoResponse> {
    return this.todosService.remove(id);
  }
}
