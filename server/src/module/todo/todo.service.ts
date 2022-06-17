import prisma from '../../util/prisma';
import { CreateTodoInput, UpdateTodoInput } from './todo.dto';

export function createTodo(data: CreateTodoInput) {
  return prisma.todo.create({ data });
}

export function getAllTodos() {
  return prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export function getTodoByID(id: string) {
  return prisma.todo.findUnique({
    where: { id },
  });
}

export function updateTodoService({ id, ...data }: UpdateTodoInput) {
  return prisma.todo.update({
    where: { id },
    data,
  });
}

export function deleteTodoService(id: string) {
  return prisma.todo.delete({
    where: { id },
  });
}
