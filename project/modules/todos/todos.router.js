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

const router = express.Router();

router.post("/", addTodoController);
router.get("/", getTodosController);

router.get("/:id", getTodoByIdController);
router.put("/:id", replaceTodoController);
router.patch("/:id", updateTodoController);
router.delete("/:id", deleteTodoController);

router.post("/:id/tags", addTagToTodoController);
router.get("/:id/tags", getTodoTagsController);
router.delete("/:id/tags/:tagId", removeTagFromTodoController);

export default router;
