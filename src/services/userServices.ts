import express from "express";
import "express-async-errors";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { newUser, findEmail, findId } from "../repositories/userRepository"
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils"


dotenv.config();

export type CreateUserData = Omit<User, "id">;

export async function signUp(createUserData: CreateUserData) 
{
  const existingUser = await findEmail(createUserData.email);
  if (existingUser) 
  {
    throw conflictError("Email must be unique");
  }
  const key = 20;
  const hashedPassword = bcrypt.hashSync(createUserData.password, key);
  await newUser({ ...createUserData, password: hashedPassword });
}

export async function signIn(loginData: CreateUserData) 
{
  const user = await findEmail(loginData.email);
  if (!user) 
  {
    throw unauthorizedError("Invalid credentials");
  }
  const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
  if (!isPasswordValid)
  {
    throw unauthorizedError("Invalid credentials");
  } 
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
}
export async function findUserId(id: number) 
{
  const user = await findId(id);
  if (!user) 
  {
    throw notFoundError("User not found");
  }
  return user;
}

const userService = {
  signUp,
  signIn,
  findUserId
}

export default userService;