import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useQueryClient } from 'react-query';
import {
  Todo,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../generated';

function Todo({ todo }: { todo: Omit<Todo, 'createdAt'> }) {
  const queryClient = useQueryClient();

  const updateTodoMutation = useUpdateTodoMutation({
    onSuccess: () => queryClient.invalidateQueries(['GetAllTodos']),
  });

  function toggleTodoCompleted() {
    updateTodoMutation.mutate({
      input: {
        id: todo.id,
        completed: !todo.completed,
      },
    });
  }

  const deleteTodoMutation = useDeleteTodoMutation({
    onSuccess: () => queryClient.invalidateQueries(['GetAllTodos']),
  });

  function deleteTodo() {
    deleteTodoMutation.mutate({
      input: {
        id: todo.id,
      },
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Link href={`/todo/${todo.id}`}>
        <a>{todo.body}</a>
      </Link>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={toggleTodoCompleted}
      />
      <button onClick={deleteTodo}>delete</button>
    </div>
  );
}

export default Todo;
