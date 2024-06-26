import { NotFoundException } from '@nestjs/common';

export class TodoNotFoundException extends NotFoundException {
  constructor() {
    super('Todo not found', 'TODO_NOT_FOUND');
  }
}
