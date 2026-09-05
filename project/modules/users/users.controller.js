// Aşama 2 — users modülünün CONTROLLER katmanı.
//
// Yazmanız gerekenler:
//
//   addUserController        → 201 + { id, username, email }   (password YOK)
//                              e-posta zaten kayıtlıysa 409
//   getUsersController       → 200 + kullanıcı listesi          (password YOK)
//   getUserTodosController   → 200 + o kullanıcının todoları
//                              kullanıcı yoksa 404
//
// Aşama 3 notu: getUserTodosController'ın todoları bulabilmesi için
// todos modülünün SERVICE katmanını çağırması gerekir. Derste konuştuğumuz
// altın kural: başka modülün service'ini çağırabilirsin, iç dosyalarına
// (db, controller, validator) dokunamazsın.
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