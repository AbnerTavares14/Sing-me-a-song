import { Request, Response } from "express";
import { prisma } from "../database.js";

export async function deleteAll(req: Request, res: Response) {
    await prisma.recommendation.deleteMany();
    res.sendStatus(200);
}