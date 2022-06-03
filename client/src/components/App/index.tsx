import React, { useEffect } from 'react';

import style from './style.module.css';
import TodoList from '../TodoList/index';
import TodoInput from '../TodoInput/index';
import SectionDivider from '../SectionDivider/index';
import { SAGA_ACTIONS } from '../../store/index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { State } from '../../types';

function App() {
  const { data: todos, isLoading } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  console.log('state in list', todos);

  useEffect(() => {
    dispatch({
      type: SAGA_ACTIONS.FETCH,
    });
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
