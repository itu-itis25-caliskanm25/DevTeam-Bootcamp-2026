import {
  createTag,
  getTags,
} from "./tags.service.js";

import { validateTag } from "./tags.validator.js";

export const createTagController = async (req, res) => {
  const { name } = req.body;

  if (!validateTag({ name })) {
    return res.status(400).json({
      error: "Tag name is required",
    });
  }

  try {
    const tag = await createTag(name.trim());

    res.status(201).json({
      ...tag,
      id: String(tag.id),
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Tag name already exists",
      });
    }

    throw error;
  }
};

export const getTagsController = async (req, res) => {
  const tags = await getTags();

  res.status(200).json(
    tags.map((tag) => ({
      ...tag,
      id: String(tag.id),
    })),
  );
};
