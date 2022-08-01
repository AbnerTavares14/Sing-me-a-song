import { prisma } from "../src/database.js";
import app from "../src/app.js";
import recommendationFactory from "./factories/recommendationFactory.js";
import { createScenarioElevenRecommendations, createScenarioOneRecommendation, createScenarioThreeRecommendations } from "./factories/scenarioFactory.js";
import supertest from "supertest";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
});

describe("POST recommendation", () => {
    it("return status code 201", async () => {
        const name = recommendationFactory.generateBody();
        const youtubeLink = "https://www.youtube.com/watch?v=VJ4v4i3H7Dk";
        const result = await supertest(app).post("/recommendations").send({ name, youtubeLink });
        expect(result.status).toEqual(201);
    });

    it("return status code 409", async () => {
        const name = recommendationFactory.generateBody();
        const youtubeLink = "https://www.youtube.com/watch?v=VJ4v4i3H7Dk";
        await supertest(app).post("/recommendations").send({ name, youtubeLink });
        const result = await supertest(app).post("/recommendations").send({ name, youtubeLink });
        expect(result.status).toEqual(409);
    });

    it("return status code 422", async () => {
        const name = recommendationFactory.generateBody();
        const youtubeLink = "https://pt.stackoverflow.com/questions/265446/comparar-valores-entre-arrays-javascript";
        const result = await supertest(app).post("/recommendations").send({ name, youtubeLink });
        expect(result.status).toEqual(422);
    });

    it("return all recommendations", async () => {
        const scenario = await createScenarioThreeRecommendations();
        const result = await supertest(app).get("/recommendations");
        expect(result.body.length).toEqual(scenario.recomendation.length);
        expect(result.body[2].name).toEqual(scenario.recomendation[0].name);
        expect(result.body[1].name).toEqual(scenario.recomendation[1].name);
        expect(result.body[0].name).toEqual(scenario.recomendation[2].name);
        expect(result.body[2].youtubeLink).toEqual(scenario.recomendation[0].youtubeLink);
        expect(result.body[1].youtubeLink).toEqual(scenario.recomendation[1].youtubeLink);
        expect(result.body[0].youtubeLink).toEqual(scenario.recomendation[2].youtubeLink);
    });

    it("return recommendation with id equal 1", async () => {
        const recommendation = await recommendationFactory.createRecommendation("https://www.youtube.com/watch?v=4mJayYlfcWo");
        const { body } = await supertest(app).get("/recommendations/1");
        expect(body.id).toEqual(recommendation.id);
        expect(body.name).toEqual(recommendation.name);
        expect(body.youtubeLink).toEqual(recommendation.youtubeLink);
        expect(body.score).toEqual(recommendation.score);
    });

    it("return 10 recommendations", async () => {
        const scenario = await createScenarioElevenRecommendations();
        const { body } = await supertest(app).get("/recommendations");
        expect(body.length).toBe(10);
    });

    it("increment score", async () => {
        const scenario = await createScenarioOneRecommendation();
        await supertest(app).post("/recommendations/1/upvote");
        const { body } = await supertest(app).get("/recommendations/1");
        expect(body.score).toBe(1);
    });

    it("decrement score", async () => {
        const scenario = await createScenarioOneRecommendation();
        await supertest(app).post("/recommendations/1/upvote");
        await supertest(app).post("/recommendations/1/downvote");
        const { body } = await supertest(app).get("/recommendations/1");
        expect(body.score).toBe(0);
    });

    it("return top 3 recommendations", async () => {
        const scenario = await createScenarioElevenRecommendations();
        await supertest(app).post("/recommendations/1/upvote");
        await supertest(app).post("/recommendations/1/upvote");
        await supertest(app).post("/recommendations/8/upvote");
        await supertest(app).post("/recommendations/5/upvote");
        await supertest(app).post("/recommendations/5/upvote");
        const { body } = await supertest(app).get("/recommendations/top/3");
        expect(body.length).toBe(3);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});