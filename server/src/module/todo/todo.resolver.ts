import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateTodoInput, DeleteTodoInput, Todo, UpdateTodoInput } from './todo.dto';
import {
  createTodo,
  deleteTodoService,
  getAllTodos,
  getTodoByID,
  updateTodoService,
} from './todo.service';

@Resolver(Todo)
class TodoResolver {
  @Query((returns) => [Todo])
  async todos() {
    const todos = await getAllTodos();
    return todos;
  }

  @Query((returns) => Todo)
  async todo(@Arg('id') id: string) {
    const todo = await getTodoByID(id);
    return todo;
  }

  @Mutation((returns) => Todo)
  async addTodo(@Arg('input') input: CreateTodoInput) {
    const todo = await createTodo(input);
    return todo;
  }

  @Mutation((returns) => Todo)
  async updateTodo(@Arg('input') input: UpdateTodoInput) {
    const todo = await updateTodoService(input);
    return todo;
  }

  @Mutation((returns) => Todo)
  async deleteTodo(@Arg('input') input: DeleteTodoInput) {
    const todo = await deleteTodoService(input.id);
    return todo;
  }
}

export default TodoResolver;
