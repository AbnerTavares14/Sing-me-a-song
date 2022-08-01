Cypress.Commands.add("recommendation", (recommendation) => {
    cy.request("POST", "http://localhost:5000/recommendations", recommendation), {
        name: recommendation.name,
        youtubeLink: recommendation.youtubeLink
    }.then((res) => {
        cy.log("response", res.body);
    });
});

Cypress.Commands.add("resetRecommendations", () => {
    cy.request("POST", "http://localhost:5000/reset-database").then((res) => {
        cy.log("response", res.body);
    });
});
