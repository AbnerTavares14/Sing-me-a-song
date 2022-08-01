import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";

function generateBody() {
    const name = faker.name.findName();
    return name;
}

async function createRecommendation(youtubeLink: string) {
    const recommendation = await prisma.recommendation.create({
        data: {
            name: faker.name.findName(),
            youtubeLink
        }
    });
    return recommendation;
}

const recommendationFactory = {
    generateBody,
    createRecommendation
};

export default recommendationFactory;