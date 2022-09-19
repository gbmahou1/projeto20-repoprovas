import { Router } from "express";
import { create, findTests } from "../controllers/testController";
import { authenticate } from "../middlewares/authenticator";

const testRouter = Router();

testRouter.post("/tests", authenticate, create);
testRouter.get("/tests", authenticate, findTests);

export default testRouter;