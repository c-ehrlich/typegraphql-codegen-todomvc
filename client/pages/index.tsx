import type { NextPage } from 'next';
import { useGetAllTodosQuery } from '../generated';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const todos = useGetAllTodosQuery();

  return (
    <div className={styles.container}>
      <div>{JSON.stringify(todos)}</div>
      <div>{todos.error ? JSON.stringify(todos.error) : null}</div>
    </div>
  );
};

export default Home;
