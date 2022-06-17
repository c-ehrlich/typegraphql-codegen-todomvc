import type { NextPage } from 'next';
import CreateTodo from '../components/CreateTodo';
import Todo from '../components/todo';
import { useGetAllTodosQuery } from '../generated';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const todos = useGetAllTodosQuery();

  if (!todos.isSuccess) return <div>loading or error...</div>;

  return (
    <div className={styles.container}>
      <CreateTodo />
      {todos.data.todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Home;
