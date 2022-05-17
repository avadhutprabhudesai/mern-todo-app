const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Request received');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server started successfully');
});

module.exports = app;
