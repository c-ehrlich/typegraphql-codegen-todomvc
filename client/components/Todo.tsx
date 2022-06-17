import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  Todo,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../generated';

function Todo({ todo }: { todo: Omit<Todo, 'createdAt'> }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<boolean>(false);
  const [body, setBody] = useState<string>(todo.body);
  const [completed, setCompleted] = useState<boolean>(todo.completed);

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
    setCompleted(c => !c);
  }

  function changeTodoBody() {
    updateTodoMutation.mutate({
      input: {
        id: todo.id,
        body,
      },
    });
    setEditing(false);
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
      <input
        type='checkbox'
        checked={completed}
        onChange={toggleTodoCompleted}
      />
      <div style={{ minWidth: '200px' }}>
        {editing ? (
          <input value={body} onChange={(e) => setBody(e.target.value)} />
        ) : (
          <Link href={`/todo/${todo.id}`}>
            <a>{body}</a>
          </Link>
        )}
      </div>

      {editing ? <button onClick={changeTodoBody}>save</button> : <button onClick={() => setEditing(true)}>edit</button>}
      <button onClick={deleteTodo}>delete</button>
    </div>
  );
}

export default Todo;
