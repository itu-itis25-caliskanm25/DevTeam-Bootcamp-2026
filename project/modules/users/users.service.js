export const users = [];

export const addUser = (username, email, password) => {
    const user = {
        id: crypto.randomUUID(),
        username,
        email,
        password,
        createdAt: new Date(),
    };

    users.push(user);

    return user;
};

export const getUsers = () => {
    return users;
};

export const getUserById = (id) => {
    return users.find((user) => user.id === id);
};

export const getUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};

export const publicUser = ({ id, username, email, createdAt }) => ({
    id,
    username,
    email,
    createdAt,
});
