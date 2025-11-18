const todoService = require('../services/todoService');

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.user.id);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body, req.user.id);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id, req.user.id);
    res.json(todo);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body, req.user.id);
    res.json(todo);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const result = await todoService.deleteTodo(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
