import { prisma } from "../database";

export async function searchTeacherId(id: number)
{
    return prisma.teacher.findUnique({ where: { id } });
}