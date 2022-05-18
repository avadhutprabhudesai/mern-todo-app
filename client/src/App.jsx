import React from 'react';

function App() {
  fetch('http://localhost:5000/todos')
    .then((data) => data.json())
    .then((data) => console.log(data));
  return <h1>React appp on express server</h1>;
}

export default App;
