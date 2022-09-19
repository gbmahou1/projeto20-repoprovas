import { Request, Response } from "express";
import { createTest, find } from "../services/testServices";
import { getTestsDiscipline } from "../repositories/testRepository";

export async function create(req: Request, res: Response) 
{
    await createTest(req.body);
    res.sendStatus(201);
}

export async function testDiscipline(req: Request, res: Response)
{
    const result = await getTestsDiscipline();
    console.log(result);
    res.sendStatus(201);

}

export async function findTests(req: Request, res: Response) 
{
    const { groupBy } = req.query as { groupBy: string };
    if (groupBy !== "disciplines" && groupBy !== "teachers") 
    {
      return res.sendStatus(400);
    }
    const tests = await find({ groupBy });
    res.send({ tests });
  }