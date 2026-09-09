import {
    addUser,
    getUsers,
    getUserById,
    getUserByEmail,
    publicUser,
} from "./users.service.js";

import { getTodosByUserId } from "../todos/todos.service.js";

export const addUserController = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res.status(409).json({
            error: "Email already exists",
        });
    }

    const user = await addUser(username, email, password);

    res.status(201).json(publicUser(user));
};

export const getUsersController = async (req, res) => {
    const users = await getUsers();

    res.json(users.map(publicUser));
};

export const getUserTodosController = async (req, res) => {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    const todos = await getTodosByUserId(id);

    res.json(todos);
};

