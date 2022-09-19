import { prisma } from "../database"
import { CreateUserData } from "../services/userServices";

export async function newUser(data: CreateUserData)
{
    return prisma.user.create({ data });
}
export async function findId(id: number)
{
    return prisma.user.findFirst({where: { id }});
}
export async function findEmail(email: string)
{
    return prisma.user.findFirst({where: { email }});
}