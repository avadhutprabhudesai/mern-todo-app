import React, { useReducer, useState } from 'react';
import style from './style.module.css';
import { List, Typography, Divider, Input } from 'antd';

function ToDoInput() {
  const [todo, setTodo] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 2,
        title: todo,
        isDone: false,
      }),
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Type and press Enter"
        className={style.input}
      />
    </form>
  );
}

function ToDoList() {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  return (
    <>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark></Typography.Text> {item}
          </List.Item>
        )}
      />
    </>
  );
}

const App = () => {
  return (
    <div className={style.layout}>
      <ToDoInput />
      <ToDoList />
    </div>
  );
};

export default App;
