import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";

function generateBody() {
    const name = faker.name.findName();
    const youtubeLink = `"https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    return { name, youtubeLink };
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