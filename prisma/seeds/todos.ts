import { PrismaClient, Todo } from '@prisma/client';

const todos = [
  {
    id: 'f697e707-d4cb-4e63-9628-0719905950e9',
    description: 'Example todo',
  },
];

export function seedTodos(prisma: PrismaClient): Promise<Todo[]> {
  return prisma.$transaction(
    todos.map((todo) =>
      prisma.todo.upsert({
        where: {
          id: todo.id,
        },
        update: todo,
        create: todo,
      }),
    ),
  );
}
