import prisma from "../../db/prisma.js";

const todoSelect = {
    id: true,
    title: true,
    description: true,
    completed: true,
    userId: true,
    createdAt: true,
};

export const selectTodos = async ({ completed, q } = {}) => {
    const where = {};

    if (completed === "true" || completed === "false") {
        where.completed = completed === "true";
    }

    if (typeof q === "string" && q.trim() !== "") {
        where.OR = [
            {
                title: {
                    contains: q,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: q,
                    mode: "insensitive",
                },
            },
        ];
    }

    return await prisma.todo.findMany({
        where,
        select: todoSelect,
        orderBy: {
            createdAt: "asc",
        },
    });
};

export const selectTodoById = async (id) => {
    return await prisma.todo.findUnique({
        where: { id },
        select: todoSelect,
    });
};

export const selectTodosByUserId = async (userId) => {
    return await prisma.todo.findMany({
        where: { userId },
        select: todoSelect,
        orderBy: {
            createdAt: "asc",
        },
    });
};

export const createTodo = async (
    title,
    description,
    completed = false,
    userId = undefined,
) => {
    return await prisma.todo.create({
        data: {
            title,
            description,
            completed,
            ...(userId !== undefined && userId !== null ? { userId } : {}),
        },
        select: todoSelect,
    });
};

export const replaceTodoById = async (
    id,
    title,
    description,
    completed,
) => {
    const { count } = await prisma.todo.updateMany({
        where: { id },
        data: {
            title,
            description,
            completed,
        },
    });

    if (count === 0) {
        return undefined;
    }

    return await selectTodoById(id);
};

export const updateTodoById = async (id, alanlar) => {
    const data = {};

    if (alanlar.title !== undefined) {
        data.title = alanlar.title;
    }

    if (alanlar.description !== undefined) {
        data.description = alanlar.description;
    }

    if (alanlar.completed !== undefined) {
        data.completed = alanlar.completed;
    }

    const { count } = await prisma.todo.updateMany({
        where: { id },
        data,
    });

    if (count === 0) {
        return undefined;
    }

    return await selectTodoById(id);
};

export const deleteTodoById = async (id) => {
    const { count } = await prisma.todo.deleteMany({
        where: { id },
    });

    return count > 0;
};
