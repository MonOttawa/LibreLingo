describe("Chips", () => {
    const CHIPS_TEST_URL = (number) => `/course/test/skill/_chips_test${number}`

    describe("Visual snapshot", () => {
        beforeEach(() => {
            cy.visit(CHIPS_TEST_URL(1))
        })

        it("ChipsChallenge", function () {
            cy.percySnapshot(this.test.fullTitle())
        })
    })

    describe("Dictionary", () => {
        beforeEach(() => {
            cy.visit(CHIPS_TEST_URL(1))
        })

        it("Has correct tooltips", () => {
            cy.get(".has-tooltip-bottom[data-tooltip=tu]").should("be.visible")
        })

        it("Word withut definition has no tooltip", () => {
            cy.get(".has-tooltip-bottom")
                .contains("How")
                .should("not.be.visible")
        })
    })

    describe("Open skill page", () => {
        beforeEach(() => {
            cy.visit(CHIPS_TEST_URL(0))
        })

        it("Has correct instruction", () => {
            cy.contains(/Translate/).should("be.visible")
            cy.contains("How").should("be.visible")
            cy.contains("are").should("be.visible")
            cy.contains("you").should("be.visible")
            cy.contains("today?").should("be.visible")
        })

        it("Has no undefined", () => {
            cy.contains("undefined").should("not.be.visible")
        })

        it("Has no panel visible", () => {
            cy.get(".panel").should("not.exist")
        })

        it("Has correct chips", () => {
            cy.get(".chip").contains("Como").should("be.visible")
            cy.get(".chip").contains("estás").should("be.visible")
            cy.get(".chip").contains("hoy").should("be.visible")
        })

        describe("Submit incorrect solution", () => {
            beforeEach(() => {
                cy.window().then((win) => win.testIncorrectSolution())
            })

            it("Panel is visible", () => {
                cy.get(".panel").should("be.visible")
            })

            describe("Submit incorrect answer", () => {
                beforeEach(() => {
                    cy.contains("Submit").click()
                })

                it("Panel says incorrect answer", () => {
                    cy.contains(/Incorrect solution/).should("be.visible")
                })

                it("Panel says what correct answer would be", () => {
                    cy.contains("Correct answer: ¿Como, estás hoy?").should(
                        "be.visible"
                    )
                })

                it("Continue button is visible", () => {
                    cy.contains("Continue").should("exist")
                })

                describe("Goes to next challenge", () => {
                    beforeEach(() => {
                        cy.contains("Continue").click()
                    })

                    it("Panel is not visible", () => {
                        cy.get(".panel").should("not.exist")
                    })
                })
            })
        })

        describe("Drag chip", () => {
            beforeEach(() => {
                cy.window().then((win) => win.testSolution())
            })

            it("Panel is visible", () => {
                cy.get(".panel").should("be.visible")
            })

            describe("Submit correct answer", () => {
                beforeEach(() => {
                    cy.contains("Submit").click()
                })

                it("Panel says correct answer", () => {
                    cy.contains(/Correct solution/).should("be.visible")
                })

                it("Continue button is visible", () => {
                    cy.contains("Continue").should("exist")
                })

                describe("Goes to next challenge", () => {
                    beforeEach(() => {
                        cy.contains("Continue").click()
                    })

                    it("Panel is not visible", () => {
                        cy.get(".panel").should("not.exist")
                    })
                })
            })
        })
    })
})
