import React, { FormEvent, useState } from 'react';
import style from './style.module.css';
import { sagaBoundActionCreator } from '../../store/';

function TodoInput() {
  const [title, setTitle] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sagaBoundActionCreator.create({
      title,
      isDone: false,
    });
    setTitle('');
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.formInput}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Add todo and press enter"
        autoFocus
      />
    </form>
  );
}

export default TodoInput;
