import React from 'react';

import style from './style.module.css';
import TodoList from '../TodoList/index';
import TodoInput from '../TodoInput/index';
import SectionDivider from '../SectionDivider/index';

const todos = [
  {
    id: 1,
    title: 'Get Milk',
    isDone: false,
  },
  {
    id: 2,
    title: 'Get Breads',
    isDone: false,
  },
  {
    id: 3,
    title: 'Pick up kids from school',
    isDone: true,
  },
  {
    id: 4,
    title: 'Visit ATM',
    isDone: false,
  },
  {
    id: 5,
    title: 'Laundry',
    isDone: true,
  },
  {
    id: 6,
    title: 'Laundry',
    isDone: true,
  },
  {
    id: 7,
    title: 'Laundry',
    isDone: true,
  },
  {
    id: 8,
    title: 'Laundry',
    isDone: true,
  },
  {
    id: 9,
    title: 'Laundry',
    isDone: true,
  },
  {
    id: 10,
    title: 'Laundry',
    isDone: true,
  },
];

function App() {
  return (
    <div className={style.appLayout}>
      <TodoInput />
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
    </div>
  );
}

export default App;
