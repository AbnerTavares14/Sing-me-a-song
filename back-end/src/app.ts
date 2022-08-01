import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import recommendationRouter from "./routers/recommendationRouter.js";
import testsRouter from "./routers/testsRouter.js";

const app = express();


app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "test") {
    app.use(testsRouter);
}
app.use("/recommendations", recommendationRouter);
app.use(errorHandlerMiddleware);

export default app;
