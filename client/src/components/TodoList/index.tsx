import cx from 'classnames';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { FaTrash, FaPen, FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import style from './style.module.css';
import { sagaBoundActionCreator } from '../../store/index';
import { useAppSelector } from '../../hooks';

type ListItemProps = {
  id: number;
  title: string;
  isDone: boolean;
};

function ConvertibleInput({
  titleStr,
  isEditable,
  isDone,
  value,
  onChange,
  onToggle,
  onSubmit,
  onToggleInputField,
}: {
  titleStr: string;
  isEditable: boolean;
  isDone: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onToggle: () => void;
  onSubmit: () => void;
  onToggleInputField: MouseEventHandler;
}) {
  return (
    <>
      {isEditable && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            onToggle();
          }}
        >
          <input
            type="text"
            className={style.itemInput}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              onSubmit();
              onToggle();
            }}
            autoFocus
          />
        </form>
      )}
      {!isEditable && (
        <span
          className={cx(style.itemText, isDone && style.crossedOut)}
          onClick={onToggleInputField}
          {...(!isDone && { title: titleStr })}
        >
          {value}
        </span>
      )}
    </>
  );
}

function TodoItem({ id, title, isDone }: ListItemProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputVal, setInputVal] = useState(title);

  const { blocked } = useAppSelector((state) => state);

  const handleToggleConvertible = () => {
    !isDone && setShowEdit((current) => !current);
  };

  const handleTitleEdit = () => {
    sagaBoundActionCreator.edit({
      id,
      update: {
        title: inputVal,
      },
    });
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
          <ConvertibleInput
            titleStr="Click to edit"
            isEditable={showEdit}
            isDone={isDone}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onToggle={handleToggleConvertible}
            onSubmit={handleTitleEdit}
            onToggleInputField={handleToggleConvertible}
          />
          <div className={style.actions}>
            <FaTrash
              className={style.action}
              title="Delete"
              onClick={handleDelete}
            />
            <FaPen
              title="Edit"
              onClick={handleToggleConvertible}
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
