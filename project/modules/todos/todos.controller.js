import {
  getTodos,
  addTodo,
  getTodoById,
  replaceTodo,
  updateTodo,
  deleteTodo,
  addTagToTodo,
  getTodoTags,
  removeTagFromTodo,
} from "./todos.service.js";

export const getTodosController = async (req, res) => {
  const { completed, q } = req.query;

  const todos = await getTodos({ completed, q });

  res.status(200).json(todos);
};

export const addTodoController = async (req, res) => {
  const { title, description, completed, userId, priority } = req.body;

  const todo = await addTodo(
    title,
    description,
    completed,
    userId,
    priority,
  );

  res.status(201).json(todo);
};

export const getTodoByIdController = async (req, res) => {
  const { id } = req.params;

  const todo = await getTodoById(id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(200).json(todo);
};

export const replaceTodoController = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const todo = await replaceTodo(
    id,
    title,
    description,
    completed,
  );

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(200).json(todo);
};

export const updateTodoController = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, priority } = req.body;

  const alanlar = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(completed !== undefined && { completed }),
    ...(priority !== undefined && { priority }),
  };

  const todo = await updateTodo(id, alanlar);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(200).json(todo);
};

export const deleteTodoController = async (req, res) => {
  const { id } = req.params;

  const deleted = await deleteTodo(id);

  if (!deleted) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(204).send();
};

// -------------------------
// Todo - Tag işlemleri
// -------------------------

export const addTagToTodoController = async (req, res) => {
  const { id } = req.params;
  const { tagId } = req.body;

  // tagId hiç gönderilmemişse 400
  if (tagId === undefined) {
    return res.status(400).json({
      error: "tagId is required",
    });
  }

  const result = await addTagToTodo(id, tagId);

  // Todo yok
  if (result.error === "todo_not_found") {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  // Tag yok
  if (result.error === "tag_not_found") {
    return res.status(404).json({
      error: "Tag not found",
    });
  }

  // Aynı bağlantı zaten var
  if (result.error === "already_exists") {
    return res.status(409).json({
      error: "Tag already attached to todo",
    });
  }

  res.status(201).json({
    todoId: result.todoId,
    tagId: String(result.tagId),
  });
};


export const getTodoTagsController = async (req, res) => {
  const { id } = req.params;

  const tags = await getTodoTags(id);

  if (tags === undefined) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.status(200).json(
    tags.map((tag) => ({
      ...tag,
      id: String(tag.id),
    })),
  );
};

export const removeTagFromTodoController = async (req, res) => {
  const { id, tagId } = req.params;

  const result = await removeTagFromTodo(id, tagId);

  if (result.error === "todo_not_found") {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  if (result.error === "tag_not_found") {
    return res.status(404).json({
      error: "Tag not found",
    });
  }

  if (result.error === "relation_not_found") {
    return res.status(404).json({
      error: "Tag is not attached to todo",
    });
  }

  res.status(204).send();
};
