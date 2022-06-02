import cx from 'classnames';
import { useState } from 'react';
import { FaTrash, FaPen, FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import style from './style.module.css';

type ListItemProps = {
  id: number;
  title: string;
  isDone: boolean;
};
function TodoItem({ id, title, isDone }: ListItemProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputVal, setInputVal] = useState(title);

  const toggleInputField = () => {
    !isDone && setShowEdit((current) => !current);
  };

  const handleTitleEdit = () => {
    console.log('Value to persist', inputVal);
    toggleInputField();
  };
  return (
    <div className={cx(style.item, isDone ? style.done : style.pending)}>
      {showEdit && (
        <input
          type="text"
          className={style.itemInput}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={handleTitleEdit}
          autoFocus
        />
      )}
      {!showEdit && (
        <span
          className={cx(style.itemText, isDone && style.crossedOut)}
          onClick={toggleInputField}
          {...(!isDone && { title: 'Click to edit' })}
        >
          {inputVal}
        </span>
      )}
      <div className={style.actions}>
        <FaTrash className={style.action} title="Delete" />
        <FaPen
          title="Edit"
          onClick={toggleInputField}
          className={cx(style.action, isDone && style.muted)}
        />
        {!isDone && (
          <FaCheckCircle title="Mark as done" className={style.action} />
        )}
        {isDone && (
          <FaMinusCircle title="Mark as undone" className={style.action} />
        )}
      </div>
    </div>
  );
}

type ListProps = {
  todos: ListItemProps[];
};

function TodoList({ todos }: ListProps) {
  return (
    <ul className={style.list}>
      {todos.length === 0 && (
        <h2 className={style.emptyText}>There are no items to display</h2>
      )}
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem id={todo.id} title={todo.title} isDone={todo.isDone} />
        </li>
      ))}
    </ul>
  );
}
TodoList.Item = TodoItem;

export default TodoList;
