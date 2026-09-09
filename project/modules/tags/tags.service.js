import {
    insertTag,
    selectTags,
    selectTagById,
} from "./tags.db.js";

export const createTag = async (name) => {
    return await insertTag(name);
};

export const getTags = async () => {
    return await selectTags();
};

export const getTagById = async (id) => {
    return await selectTagById(id);
};
