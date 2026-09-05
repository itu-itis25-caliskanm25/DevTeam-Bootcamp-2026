import {
  getTodos,
  addTodo,
  getTodoById,
  replaceTodo,
  updateTodo,
  deleteTodo,
} from "./todos.service.js";

export const getTodosController = (req, res) => {
  const { completed, q } = req.query;
  const todos = getTodos({ completed, q });

  res.status(200).json(todos);
};

export const addTodoController = (req, res) => {
  const { title, description, completed, userId } = req.body;

  const todo = addTodo(title, description, completed, userId);

  res.status(201).json(todo);
};

export const getTodoByIdController = (req, res) => {
  const { id } = req.params;

  const todo = getTodoById(id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(200).json(todo);
};

export const replaceTodoController = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const todo = replaceTodo(id, title, description, completed);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(200).json(todo);
};

export const updateTodoController = (req, res) => {
  const { id } = req.params;

  const todo = updateTodo(id, req.body);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(200).json(todo);
};

export const deleteTodoController = (req, res) => {
  const { id } = req.params;

  const deleted = deleteTodo(id);

  if (!deleted) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(204).send();
};
