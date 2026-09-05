
import { addUser, getUsers, getUserById, getUserByEmail, publicUser } from "./users.service.js";

import { getTodosByUserId } from "../todos/todos.service.js";

export const addUserController = (req, res) => {
    const { username, email, password } = req.body;
    
    const existingUser = getUserByEmail(email);

    if(existingUser) {
        return res.status(409).json({
            error: "Email already exists",
        });
    }

    const user = addUser(username, email, password);

    res.status(201).json(publicUser(user));
};

export const getUsersController = (req, res) => {
    const users = getUsers();

    res.json(users.map(publicUser));
};

export const getUserTodosController = (req, res) => {
    const { id } = req.params;

    const user = getUserById(id);

    if(!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    const todos = getTodosByUserId(id);

    res.json(todos);
};