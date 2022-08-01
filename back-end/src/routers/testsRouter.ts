import { Router } from "express";
import { deleteAll } from "../controllers/testsController.js";

const testsRouter = Router();

testsRouter.post("/reset-database", deleteAll);

export default testsRouter;