import React from 'react';

function App() {
  fetch('https://localhost:5000/v1/todos?limit=10&page=1')
    .then((data) => data.json())
    .then((data) => console.log(data));
  return <h1>React appp on express server</h1>;
}

export default App;
