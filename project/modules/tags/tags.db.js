import prisma from "../../db/prisma.js";

export const insertTag = async (name) => {
    return await prisma.tag.create({
        data: {
            name,
        },
        select: {
            id: true,
            name: true,
        },
    });
};

export const selectTags = async () => {
    return await prisma.tag.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            name: "asc",
        },
    });
};

export const selectTagById = async (id) => {
    return await prisma.tag.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
        },
    });
};
