import { faker } from "@faker-js/faker";

export default function testBodyFactory() 
{
  const body: object = { name: faker.color.human(), pdfUrl: faker.color.human(), categoryId: 1, teacherDisciplineId: 1};
  return body;
}