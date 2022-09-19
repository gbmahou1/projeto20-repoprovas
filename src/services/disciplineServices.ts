import { prisma } from "../database";

export async function searchDisciplineId(id: number)
{
    return prisma.discipline.findUnique({ where: { id } });
}