import { PrismaService } from '@libs/prisma';
import { Injectable } from '@nestjs/common';

import {
  CreateTodoRequestBody,
  CreateTodoResponse,
} from './dto/create-todo.dto';
import { FindAllTodosResponse } from './dto/find-all-todos.dto';
import { FindOneTodoResponse } from './dto/find-one-todos.dto';
import { RemoveTodoResponse } from './dto/remove-todo.dto';
import {
  UpdateTodoRequestBody,
  UpdateTodoResponse,
} from './dto/update-todo.dto';
import { TodoNotFoundException } from './todos.exceptions';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateTodoRequestBody): Promise<CreateTodoResponse> {
    return this.prismaService.todo.create({ data });
  }

  findAll(): Promise<FindAllTodosResponse[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: string): Promise<FindOneTodoResponse> {
    const todo = await this.prismaService.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) throw new TodoNotFoundException();

    return todo;
  }

  update(id: string, data: UpdateTodoRequestBody): Promise<UpdateTodoResponse> {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string): Promise<RemoveTodoResponse> {
    return this.prismaService.todo.delete({ where: { id } });
  }
}
