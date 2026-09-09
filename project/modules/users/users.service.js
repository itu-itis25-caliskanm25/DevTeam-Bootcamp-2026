import {
    createUser,
    selectUsers,
    selectUserById,
    selectUserByEmail,
    upsertProfile,
    selectProfileByUserId,
} from "./users.db.js";

export const addUser = async (username, email, password) => {
    return await createUser(username, email, password);
};

export const getUsers = async () => {
    return await selectUsers();
};

export const getUserById = async (id) => {
    return await selectUserById(id);
};

export const getUserByEmail = async (email) => {
    return await selectUserByEmail(email);
};

export const saveProfile = async (userId, bio) => {
    return await upsertProfile(userId, bio);
};

export const getProfileByUserId = async (userId) => {
    return await selectProfileByUserId(userId);
};

export const publicUser = ({ id, username, email, createdAt }) => ({
    id,
    username,
    email,
    createdAt,
});
