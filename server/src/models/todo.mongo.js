const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

ToDoSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Todo = mongoose.model('Todo', ToDoSchema);

module.exports = Todo;
