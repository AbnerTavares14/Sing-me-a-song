import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { jest } from "@jest/globals";

jest.mock("../../src/repositories/recommendationRepository.js");

describe("recommendationService test suite", () => {
    it("insert recommendation", async () => {
        jest.spyOn(recommendationRepository, "findByName").mockImplementation((): any => { });
        jest.spyOn(recommendationRepository, "create").mockImplementation((): any => { });
        const body = { name: "teste", youtubeLink: "https://www.youtube.com/watch?v=DmWWqogr_r8" };
        await recommendationService.insert(body);
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    });

    it("failed insert", async () => {
        const recommendation = { name: "teste", youtubeLink: "https://www.youtube.com/watch?v=7wRZN8ysiaY" };
        jest.spyOn(recommendationRepository, "findByName").mockImplementation((): any => {
            return {
                name: recommendation.name,
                youtubeLink: recommendation.youtubeLink
            }
        });
        const promise = recommendationService.insert(recommendation);
        expect(promise).rejects.toEqual({ type: "conflict", message: "Recommendations names must be unique" });
    });

    it("upvote recommendation", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
            return { id: 1, name: "teste", youtubeLink: "dsadasd", score: 2 };
        });
        jest.spyOn(recommendationRepository, "updateScore").mockImplementation((): any => { });
        await recommendationService.upvote(1);
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it("upvote recommendation failed", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
            return false
        });
        const promise = recommendationService.upvote(1);
        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });

    it("downvote recommendation", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
            return { id: 1, name: "teste", youtubeLink: "dsadasd", score: 2 };
        });
        jest.spyOn(recommendationRepository, "updateScore").mockImplementation((): any => {
            return { id: 1, name: "teste", youtubeLink: "dsadasd", score: 2 };
        });
        jest.spyOn(recommendationRepository, "remove").mockImplementation((): any => { });
        await recommendationService.downvote(1);
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it("remove downvote recommendation with score < -5", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
            return { id: 1, name: "teste", youtubeLink: "dsadasd", score: -6 };
        });
        jest.spyOn(recommendationRepository, "updateScore").mockImplementation((): any => {
            return { id: 1, name: "teste", youtubeLink: "dsadasd", score: -6 };
        });
        jest.spyOn(recommendationRepository, "remove").mockImplementation((): any => { });
        await recommendationService.downvote(1);
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });

    it("downvote recommendation failed", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
            return false
        });
        const promise = recommendationService.downvote(1);
        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });

    it("random recommendation", async () => {
        jest.spyOn(Math, "random").mockImplementation((): any => {
            return 0.7;
        });
        jest.spyOn(recommendationRepository, "findAll").mockImplementation((): any => {
            return [
                { id: 1, name: "teste", youtubeLink: "sadsadas", score: 2 },
                { id: 1, name: "teste2", youtubeLink: "sadsadasadsa", score: 3 },
                { id: 1, name: "teste3", youtubeLink: "sadsadasada", score: 1 }
            ]
        });
        jest.spyOn(Math, "floor").mockImplementation((): any => { });
        await recommendationService.getRandom();
        expect(Math.random).toBeCalled();
        expect(Math.floor).toBeCalled();
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("failed random recommmendation", async () => {
        jest.spyOn(Math, "random").mockImplementation((): any => {
            return 0.3;
        });
        jest.spyOn(recommendationRepository, "findAll").mockImplementation((): any => {
            return [];
        });
        const promise = recommendationService.getRandom();
        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });

    it("get recommendations", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementation((): any => {
            return [];
        });
        await recommendationService.get();
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("get top recommendations", async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementation((): any => {
            return [];
        });
        await recommendationService.getTop(1);
        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

    it("get recommendation by id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
            return { id: 1, name: "asdasd", youtubeLink: "sadasdas", score: 2 };
        });
        await recommendationService.getById(1);
        expect(recommendationRepository.find).toBeCalled();
    });

    it("failed get recommendation by id", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
            return false;
        });
        const promise = recommendationService.getById(1);
        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });
});