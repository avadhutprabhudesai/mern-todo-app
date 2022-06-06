import cx from 'classnames';
import { useState } from 'react';
import { FaTrash, FaPen, FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import style from './style.module.css';
import { sagaBoundActionCreator } from '../../store/index';
import { useAppSelector } from '../../hooks';

type ListItemProps = {
  id: number;
  title: string;
  isDone: boolean;
};
function TodoItem({ id, title, isDone }: ListItemProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputVal, setInputVal] = useState(title);

  const { blocked } = useAppSelector((state) => state);

  const toggleInputField = () => {
    !isDone && setShowEdit((current) => !current);
  };

  const handleTitleEdit = () => {
    sagaBoundActionCreator.edit({
      id,
      update: {
        title: inputVal,
      },
    });
    toggleInputField();
  };

  const handleDelete = () => {
    sagaBoundActionCreator.delete({ id });
  };

  const handleMarkAsDone = () => {
    sagaBoundActionCreator.edit({
      id,
      update: {
        title,
        isDone: true,
      },
    });
  };
  const handleMarkAsUnDone = () => {
    sagaBoundActionCreator.edit({
      id,
      update: {
        title,
        isDone: false,
      },
    });
  };
  return (
    <div
      className={cx(
        style.item,
        isDone ? style.done : style.pending,
        blocked.includes(id) && style.fade
      )}
    >
      {blocked.includes(id) ? (
        <span>Saving changes...</span>
      ) : (
        <>
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
            <FaTrash
              className={style.action}
              title="Delete"
              onClick={handleDelete}
            />
            <FaPen
              title="Edit"
              onClick={toggleInputField}
              className={cx(style.action, isDone && style.muted)}
            />
            {!isDone && (
              <FaCheckCircle
                title="Mark as done"
                className={style.action}
                onClick={handleMarkAsDone}
              />
            )}
            {isDone && (
              <FaMinusCircle
                title="Mark as undone"
                className={style.action}
                onClick={handleMarkAsUnDone}
              />
            )}
          </div>
        </>
      )}
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
