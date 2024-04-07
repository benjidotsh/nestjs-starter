import { faker } from '@faker-js/faker';
import { PrismaService } from '@libs/prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { Todo } from '@prisma/client';
import { mock, mockDeep } from 'jest-mock-extended';

import { CreateTodoRequestBody } from './dto/create-todo.dto';
import { UpdateTodoRequestBody } from './dto/update-todo.dto';
import { TodoNotFoundException } from './todos.exceptions';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todosService: TodosService;
  const prismaService = mockDeep<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
  });

  describe('create', () => {
    it('should return a todo', async () => {
      const todo = mock<Todo>();

      prismaService.todo.create.mockResolvedValue(todo);

      const result = await todosService.create(mock<CreateTodoRequestBody>());

      expect(result).toEqual(todo);
    });
  });

  describe('findAll', () => {
    it('should return todos', async () => {
      const todos = mock<Todo[]>();

      prismaService.todo.findMany.mockResolvedValue(todos);

      const result = await todosService.findAll();

      expect(result).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      const todo = mock<Todo>();

      prismaService.todo.findUnique.mockResolvedValue(todo);

      const result = await todosService.findOne(faker.string.uuid());

      expect(result).toEqual(todo);
    });

    it('should throw an error if no todo exists', async () => {
      prismaService.todo.findUnique.mockResolvedValue(null);

      await expect(todosService.findOne(faker.string.uuid())).rejects.toThrow(
        TodoNotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should return a todo', async () => {
      const todo = mock<Todo>();

      prismaService.todo.update.mockResolvedValue(todo);

      const result = await todosService.update(
        faker.string.uuid(),
        mock<UpdateTodoRequestBody>(),
      );

      expect(result).toEqual(todo);
    });
  });

  describe('remove', () => {
    it('should return a todo', async () => {
      const todo = mock<Todo>();

      prismaService.todo.delete.mockResolvedValue(todo);

      const result = await todosService.remove(faker.string.uuid());

      expect(result).toEqual(todo);
    });
  });
});
