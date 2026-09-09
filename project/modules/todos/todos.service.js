import {
  selectTodos,
  selectTodoById,
  selectTodosByUserId,
  createTodo,
  replaceTodoById,
  updateTodoById,
  deleteTodoById,
  insertTodoTag,
  selectTodoTags,
  deleteTodoTag,
} from "./todos.db.js";

import { getTagById } from "../tags/tags.service.js";

export const addTodo = async (
  title,
  description,
  completed = false,
  userId = undefined,
  priority,
) => {
  return await createTodo(
    title,
    description,
    completed,
    userId,
    priority,
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

// -------------------------
// Todo - Tag işlemleri
// -------------------------

export const addTagToTodo = async (todoId, tagId) => {
  const todo = await selectTodoById(todoId);

  if (!todo) {
    return { error: "todo_not_found" };
  }

  const tag = await getTagById(tagId);

  if (!tag) {
    return { error: "tag_not_found" };
  }

  try {
    return await insertTodoTag(todoId, tagId);
  } catch (error) {
    if (error.code === "P2002") {
      return { error: "already_exists" };
    }

    throw error;
  }
};

export const getTodoTags = async (todoId) => {
  const todo = await selectTodoById(todoId);

  if (!todo) {
    return undefined;
  }

  return await selectTodoTags(todoId);
};

export const removeTagFromTodo = async (todoId, tagId) => {
  const todo = await selectTodoById(todoId);

  if (!todo) {
    return false;
  }

  return await deleteTodoTag(todoId, tagId);
};
