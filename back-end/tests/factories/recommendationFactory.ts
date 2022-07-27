import { faker } from "@faker-js/faker";

function generateBody() {
    const name = faker.name.findName();
    return name;
}

const recommendationFactory = {
    generateBody
};

export default recommendationFactory;