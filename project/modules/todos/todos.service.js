import {
  selectTodos,
  selectTodoById,
  selectTodosByUserId,
  createTodo,
  replaceTodoById,
  updateTodoById,
  deleteTodoById,
} from "./todos.db.js";

export const addTodo = async (
  title,
  description,
  completed = false,
  userId = undefined,
) => {
  return await createTodo(
    title,
    description,
    completed,
    userId,
  );
};

export const getTodos = async ({ completed, q } = {}) => {
  return await selectTodos({ completed, q });
};

export const getTodoById = async (id) => {
  return await selectTodoById(id);
};

export const getTodosByUserId = async (userId) => {
  return await selectTodosByUserId(userId);
};

export const replaceTodo = async (
  id,
  title,
  description,
  completed,
) => {
  return await replaceTodoById(
    id,
    title,
    description,
    completed,
  );
};

export const updateTodo = async (id, alanlar) => {
  return await updateTodoById(id, alanlar);
};

export const deleteTodo = async (id) => {
  return await deleteTodoById(id);
};
