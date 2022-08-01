import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";
import recommendationFactory from "./recommendationFactory.js";

export async function createScenarioThreeRecommendations() {
    const recommendation1 = await recommendationFactory.createRecommendation("https://www.youtube.com/watch?v=VJ4v4i3H7Dk");
    const recomendation2 = await recommendationFactory.createRecommendation("https://www.youtube.com/watch?v=K0p8HNpn0Qo");
    const recomendation3 = await recommendationFactory.createRecommendation("https://www.youtube.com/watch?v=6knyKSR6yV8");

    return {
        recomendation: [recommendation1, recomendation2, recomendation3]
    }

};

export async function createScenarioElevenRecommendations() {
    const recommendation1 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation2 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation3 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation4 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation5 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation6 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation7 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation8 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation9 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation10 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    const recommendation11 = await recommendationFactory.createRecommendation(`https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);
    return {
        recomendation: [recommendation1, recommendation2, recommendation3, recommendation4, recommendation5, recommendation6, recommendation7, recommendation8, recommendation9, recommendation10, recommendation11]
    }
};



export async function createScenarioOneRecommendation() {
    const recommendation = await recommendationFactory.createRecommendation(`"https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`);

    return {
        recommendation
    }
}