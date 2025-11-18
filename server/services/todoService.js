const Todo = require('../models/todo.js');

const getTodos = async (userId) => {
  return await Todo.find({ user: userId }).populate('user', 'username');
};

const createTodo = async (todoData, userId) => {
  const { description } = todoData;
  const newTodo = new Todo({
    description,
    user: userId,
  });
  return await newTodo.save();
};

const getTodoById = async (todoId, userId) => {
  const todo = await Todo.findOne({ _id: todoId, user: userId });
  if (!todo) {
    throw new Error('Todo not found or user not authorized');
  }
  return todo;
};

const updateTodo = async (todoId, updateData, userId) => {
  const { description, completed } = updateData;
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, user: userId },
    { description, completed },
    { new: true }
  );
  if (!todo) {
    throw new Error('Todo not found or user not authorized');
  }
  return todo;
};

const deleteTodo = async (todoId, userId) => {
  const todo = await Todo.findOneAndDelete({ _id: todoId, user: userId });
  if (!todo) {
    throw new Error('Todo not found or user not authorized');
  }
  return { msg: 'Todo deleted successfully' };
};

module.exports = {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
