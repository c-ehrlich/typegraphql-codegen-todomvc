import { useRouter } from 'next/router';
import { useGetTodoQuery } from '../../generated';

function SingleTodoPage() {
  const router = useRouter();
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query;

  const todo = useGetTodoQuery({ id });

  if (!todo.data) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => router.push('/')}>back</button>
      <h1>{todo.data.todo.body}</h1>
      {JSON.stringify(todo)}
    </div>
  );
}

export default SingleTodoPage;
