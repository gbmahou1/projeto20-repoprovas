import { faker } from "@faker-js/faker";
import { CreateUserData } from "../../src/services/userServices";

export default function userBodyFactory() 
{
  const body: CreateUserData = { email: faker.internet.email(), password: faker.internet.password(),};
  return body;
}