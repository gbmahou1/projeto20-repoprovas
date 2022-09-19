import express from "express";
import "express-async-errors";
import { Category, Test, Term, TeacherDiscipline, Teacher, Discipline } from "@prisma/client";
import { badRequestError, notFoundError } from "../utils/errorUtils";
import { searchCategoryId } from "./categoryServices";
import { searchDisciplineId } from "./disciplineServices";
import { searchTeacherId } from "./teacherService";
import { searchTeacherDisciplineId } from "./teacherDisciplineService";
import { createNewTest, getTestsDiscipline, getTestsTeachers } from "../repositories/testRepository";

interface Filter 
{
  groupBy: "disciplines" | "teachers";
}

export type CreateTestData = Omit<Test, "id" | "teacherDisciplineId" | "view" > & 
{
    teacherId: number;
    disciplineId: number;
};

export async function createTest(data: CreateTestData)
{
    const { categoryId, teacherId, disciplineId, name, pdfUrl } = data;
    const existingCategory = await searchCategoryId(categoryId);
    if (!existingCategory) 
    {
        throw badRequestError("Category doesn't exist");
    }
    const existingDiscipline = await searchDisciplineId(disciplineId);
    if (!existingDiscipline)
    {
        throw badRequestError("Discipline doesn't exist");
    }
    const existingTeacher = await searchTeacherId(teacherId);
    if (!existingTeacher) 
    {
        throw badRequestError("Teacher doesn't exist");
    }
    const teacherDiscipline = await searchTeacherDisciplineId(teacherId, disciplineId);
    if (!teacherDiscipline) 
    {
      throw badRequestError("Teacher doesn't teach this discipline");
    }
    await createNewTest({ name, pdfUrl, categoryId, teacherDisciplineId: teacherDiscipline.id });
}

export async function find(filter: Filter) 
{
    const { groupBy } = filter;
    if (groupBy === "disciplines") 
    {
      return getTestsDiscipline()
    } 
    if (groupBy === "teachers") 
    {
      return getTestsTeachers()
    }
  }