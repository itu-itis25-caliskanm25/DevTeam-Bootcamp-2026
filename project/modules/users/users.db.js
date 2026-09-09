import { prisma } from "../../db/prisma.js";

const publicUserSelect = {
    id: true,
    username: true,
    email: true,
    createdAt: true,
};

export const createUser = async (username, email, password) => {
    return await prisma.user.create({
        data: {
            username,
            email,
            password,
        },
        select: publicUserSelect,
    });
};


export const selectUsers = async () => {
    return await prisma.user.findMany({
        select: publicUserSelect,
        orderBy: {
            createdAt: "asc",
        },
    });
};

export const selectUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id },
        select: publicUserSelect,
    });
};

export const selectUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
        select: publicUserSelect,
    });
};
