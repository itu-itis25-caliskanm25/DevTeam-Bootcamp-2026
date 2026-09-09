import { getUserById } from "../users/users.service.js";

export const validateAddTodo = async (req, res, next) => {
  const { title, description, completed, userId } = req.body;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res.status(400).json({
      error: "Title and description are required and must be strings",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Completed must be a boolean",
    });
  }

  if (userId !== undefined && userId !== null) {
    if (!(await getUserById(userId))) {
      return res.status(400).json({
        error: "User not found",
      });
    }
  }

  next();
};

export const validateReplaceTodo = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      error:
        "Title, description and completed are required and must have valid types",
    });
  }

  next();
};

export const validateUpdateTodo = (req, res, next) => {
  const { title, description, completed } = req.body;

  const hasTitle = title !== undefined;
  const hasDescription = description !== undefined;
  const hasCompleted = completed !== undefined;

  if (!hasTitle && !hasDescription && !hasCompleted) {
    return res.status(400).json({
      error: "At least one field is required",
    });
  }

  if (hasTitle && typeof title !== "string") {
    return res.status(400).json({
      error: "Title must be string",
    });
  }

  if (hasDescription && typeof description !== "string") {
    return res.status(400).json({
      error: "Description must be a string",
    });
  }

  if (hasCompleted && typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Completed must be a boolean",
    });
  }

  next();
};
