/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("recommentation song", () => {
    const name = faker.name.findName();
    const youtubeLink = `"https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    beforeEach(() => {
        cy.resetRecommendations();
    });
    it("get recommendations", () => {

        cy.visit("http://localhost:3000");
        cy.get("#name").type(name);
        cy.get("#url").type(youtubeLink);

        cy.intercept("POST", "/recommendations").as("recommendations");
        cy.get("#button").click();
        cy.wait("@recommendations");

        cy.get("#1").click();

        cy.url().should("equal", "http://localhost:3000/");
    });
});