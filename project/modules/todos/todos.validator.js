import { getUserById } from "../users/users.service.js";

export const validateAddTodo = async (req, res, next) => {
  const { title, description, completed, userId, priority } = req.body;

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

  if (priority !== undefined && !Number.isInteger(priority)) {
    return res.status(400).json({
      error: "Priority must be an integer",
    });
  }

  if (userId !== undefined && userId !== null) {
    try {
      const user = await getUserById(userId);

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
    } catch (error) {
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
    title.trim() === "" ||
    typeof description !== "string" ||
    description.trim() === "" ||
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
  const { title, description, completed, priority } = req.body;

  const hasTitle = title !== undefined;
  const hasDescription = description !== undefined;
  const hasCompleted = completed !== undefined;
  const hasPriority = priority !== undefined;

  if (!hasTitle && !hasDescription && !hasCompleted && !hasPriority) {
    return res.status(400).json({
      error: "At least one field is required",
    });
  }

  if (
    hasTitle &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res.status(400).json({
      error: "Title must be a non-empty string",
    });
  }

  if (
    hasDescription &&
    (typeof description !== "string" || description.trim() === "")
  ) {
    return res.status(400).json({
      error: "Description must be a non-empty string",
    });
  }

  if (hasCompleted && typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Completed must be a boolean",
    });
  }

  if (hasPriority && !Number.isInteger(priority)) {
    return res.status(400).json({
      error: "Priority must be an integer",
    });
  }

  next();
};
