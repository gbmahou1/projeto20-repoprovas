import { prisma } from "../database";

export async function searchCategoryId(id: number)
{
    return prisma.category.findUnique({ where: { id } });
}