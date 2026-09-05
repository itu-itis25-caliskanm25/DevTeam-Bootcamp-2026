
import express from "express";
import {
    addUserController,
    getUsersController,
    getUserTodosController,
} from "./users.controller.js";
import { validateAddUser } from "./users.validator.js";

const r = express.Router();

r.post("/", validateAddUser, addUserController);

r.get("/", getUsersController);

r.get("/:id/todos", getUserTodosController);

export default r;