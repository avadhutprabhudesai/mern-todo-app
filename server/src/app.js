const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Request received');
});

app.listen(3000, () => {
  console.log('server started successfully');
});

module.exports = app;
