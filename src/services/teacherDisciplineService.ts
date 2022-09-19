import { prisma } from "../database";

export async function searchTeacherDisciplineId(teacherId: number, disciplineId: number)
{
    return prisma.teacherDiscipline.findFirst({ where: {AND: { disciplineId, teacherId }}});
}