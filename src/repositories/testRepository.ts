import { Prisma } from "@prisma/client";
import { prisma } from "../database";
import { badRequestError } from "../utils/errorUtils";

export async function createNewTest(createTestData: Prisma.TestUncheckedCreateInput) 
{
    await prisma.test.create({ data: createTestData });
}

export async function getTestsDiscipline() {
    return prisma.term.findMany({
      include: {
        Disclipline: {
          include: {
            TeacherDiscipline: {
              include: {
                Teacher: true,
                Test: {
                  include: {
                    Category: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  export async function getTestsTeachers() {
    return prisma.teacherDiscipline.findMany({
      include: {
        Teacher: true,
        Discipline: true,
        Test: {
          include: {
            Category: true,
          },
        },
      },
    });
  }


