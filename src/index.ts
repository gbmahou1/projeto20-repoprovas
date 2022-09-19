import express, {json} from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import router from "./routes";
import 'express-async-errors';
import errorHandler from "./middlewares/errorHandler";

const app = express()
dotenv.config()

app.use(cors())
app.use(json())
app.use(router)
app.use(errorHandler)

const PORT: number = Number(process.env.PORT);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;

