import React, { useEffect } from 'react';

import style from './style.module.css';
import TodoList from '../TodoList/index';
import TodoInput from '../TodoInput/index';
import SectionDivider from '../SectionDivider/index';
import { sagaBoundActionCreator } from '../../store/index';
import { useAppSelector } from '../../hooks';

function App() {
  const { data: todos, isLoading } = useAppSelector((state) => state);

  useEffect(() => {
    sagaBoundActionCreator.fetch();
  }, []);

  return (
    <div className={style.appLayout}>
      <TodoInput />
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <div className={style.details}>
          <div className={style.listContainer}>
            <SectionDivider text="Pending" />
            <TodoList todos={todos.filter((t) => !t.isDone)} />
          </div>
          <div className={style.listContainer}>
            <SectionDivider text="Done" />
            <TodoList todos={todos.filter((t) => t.isDone)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
