import express from "express";

import {
    createTagController,
    getTagsController,
} from "./tags.controller.js";

const router = express.Router();

router.post("/", createTagController);
router.get("/", getTagsController);

export default router;
