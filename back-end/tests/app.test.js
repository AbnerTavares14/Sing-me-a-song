import { prisma } from "../src/database.js";
import app from "../src/app.js";
import recommendationFactory from "./factories/recommendationFactory.js";
import supertest from "supertest";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM recommendations;`;
});

describe("POST recommendation", () => {
    it("return status code 201", async () => {
        const name = recommendationFactory.generateBody();
        const youtubeLink = "https://www.youtube.com/watch?v=VJ4v4i3H7Dk";
        const result = await supertest(app).post("/recommendations").send({ name, youtubeLink });
        expect(result.status).toEqual(201);
    });

    it("return status code 422", async () => {
        const name = recommendationFactory.generateBody();
        const youtubeLink = "https://pt.stackoverflow.com/questions/265446/comparar-valores-entre-arrays-javascript";
        const result = await supertest(app).post("/recommendations").send({ name, youtubeLink });
        expect(result.status).toEqual(422);
    });

    it("return all recommendations", async () => {
        const name = recommendationFactory.generateBody();
        await supertest(app).post("/recommendations").send({ name, youtubeLink: "https://www.youtube.com/watch?v=Vik1dtQ0eHc" });
        await supertest(app).post("/recommendations").send({ name, youtubeLink: "https://www.youtube.com/watch?v=VJ4v4i3H7Dk" });
        await supertest(app).post("/recommendations").send({ name, youtubeLink: "https://www.youtube.com/watch?v=x2ZRoWQ0grU" });
        const result = await supertest(app).get("/recommendations");
        console.log(result.body);
        expect(result.body.length).toEqual(3);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});