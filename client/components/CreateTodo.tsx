import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useCreateTodoMutation } from '../generated';

function CreateTodo() {
  const [body, setBody] = useState<string>('');
  const queryClient = useQueryClient();

  const createTodo = useCreateTodoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['GetAllTodos']);
    },
  });

  function createTodoMutate() {
    createTodo.mutate({
      input: {
        body,
      },
    });
    setBody('');
  }

  return (
    <div>
      <input value={body} onChange={(e) => setBody(e.target.value)} />
      <button onClick={createTodoMutate}>Create</button>
    </div>
  );
}

export default CreateTodo;
