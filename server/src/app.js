const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');
const ToDosRouter = require('./routes/todos.router');
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/todos', ToDosRouter);
app.use((err, req, res, next) => {
  return res.status(err.status).json({
    message: err.message,
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

// if (cluster.isMaster) {
//   const NUM_CORES = os.cpus().length;
//   for (let i = 0; i < NUM_CORES; i++) {
//     cluster.fork();
//   }
// } else {
// }
app.listen(PORT, () => {
  console.log(`Worker listening on ${PORT}`);
});

module.exports = app;
