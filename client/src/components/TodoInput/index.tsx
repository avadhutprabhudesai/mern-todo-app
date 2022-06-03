import React, { FormEvent, useState } from 'react';
import style from './style.module.css';
import { useDispatch } from 'react-redux';
import { SAGA_ACTIONS } from '../../store/index';

function TodoInput() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: SAGA_ACTIONS.CREATE,
      payload: {
        title,
        isDone: false,
      },
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
