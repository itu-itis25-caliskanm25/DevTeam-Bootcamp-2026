import express from "express";

import {
  getTodosController,
  addTodoController,
  getTodoByIdController,
  replaceTodoController,
  updateTodoController,
  deleteTodoController,
  addTagToTodoController,
  getTodoTagsController,
  removeTagFromTodoController,
} from "./todos.controller.js";

import {
  validateAddTodo,
  validateReplaceTodo,
  validateUpdateTodo,
} from "./todos.validator.js";

const router = express.Router();

router.post(
  "/",
  validateAddTodo,
  addTodoController,
);

router.get("/", getTodosController);

router.get("/:id", getTodoByIdController);

router.put(
  "/:id",
  validateReplaceTodo,
  replaceTodoController,
);

router.patch(
  "/:id",
  validateUpdateTodo,
  updateTodoController,
);

router.delete("/:id", deleteTodoController);

// Todo - Tag
router.post("/:id/tags", addTagToTodoController);
router.get("/:id/tags", getTodoTagsController);
router.delete(
  "/:id/tags/:tagId",
  removeTagFromTodoController,
);

export default router;
