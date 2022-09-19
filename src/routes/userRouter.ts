import { Router } from "express";
import { login, register } from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schemas/userSchema";

const userRouter = Router();

userRouter.post("/signin", validateSchema(userSchema), login);
userRouter.post("/signup", validateSchema(userSchema), register);

export default userRouter;

