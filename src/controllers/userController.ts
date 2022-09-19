import { Request, Response } from "express";
import userService from "../services/userServices";

export async function register(req: Request, res: Response) 
{
  const user = req.body;
  await userService.signUp(user);
  res.sendStatus(201);
}
export async function login(req: Request, res: Response) 
{
  const user = req.body;
  const token = await userService.signIn(user);
  res.send({ token });
}

