
import express from "express";
import {
    addUserController,
    getUsersController,
    getUserTodosController,
    upsertProfileController,
    getProfileController,
} from "./users.controller.js";
import { validateAddUser, validateProfile } from "./users.validator.js";

const r = express.Router();

r.post("/", validateAddUser, addUserController);

r.get("/", getUsersController);

r.get("/:id/todos", getUserTodosController);

r.put("/:id/profile", validateProfile, upsertProfileController);

r.get("/:id/profile", getProfileController);

export default r;