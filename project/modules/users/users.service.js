export const users = [];

export const addUser = (username, email, password) => {
    const users = {
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
    const user = users.find((user) => user.id === id);

    if(!user){
        return;
    }

    return user;
};

export const getUserByEmail = (email) => {
    const user = users.find((user) => user.email === email);

    if(!user){
        return;
    }

    return user;
};

export const publicUser = ({ id, username, email, createdAt }) => ({
    id,
    username,
    email,
    createdAt,
});