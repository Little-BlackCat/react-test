describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should render the Header with the Navbar', () => {
    cy.get('[data-testid="header"]')
      .should('exist')  // Ensure the Header exists
      .and('have.class', 'header')  // Verify the class name
      .within(() => {  // Focus interactions within the Header
        cy.get('[data-testid="navbar"]')
          .should('exist') // Ensure the Navbar is present within the Header
          .within(() => {
            cy.get('[data-testid="menu"]')
              .should('exist')
              .and('have.class', 'menu')
              .within(() => {
                cy.get('[data-testid="languages"]')
                  .should('exist')
                  .and('have.class', 'languages')
                  .within(() => {
                    cy.get('[data-testid="languages-selected"]')
                      .should('exist')
                  })
                cy.get('[data-testid="link"]')
                  .should('exist')
                  .and('have.class', 'link-to-home')
                  .and('be.visible')
                  .within(() => {
                    cy.get('[data-testid="home-icon"]')
                      .should('exist')
                      .and('have.class', 'home-icon')
                  })
                  .click()
                  cy.url().should('include', '/react-test/');
              })
          })
      })
  })

  it('should render the Topic of testing', () => {
    cy.get('[data-testid="main"]')
      .should('exist')
      .and('have.class', 'main')
      .within(() => {
        cy.get('[data-testid="home"]')
          .should('exist')
          .and('have.class', 'home')
        cy.get('[data-testid="home"] .container')
        .should('exist')
        .should('have.length', 3)
        .each(() => {
          cy.get('.container-detail')
            .should('exist')
            .should('have.class', 'container-detail')
        })
      })
  })

  it('should change the selected language and trigger events', () => {
    cy.clearLocalStorage()
    cy.get('[data-testid="languages-selected"]').click();
    cy.get('.ant-select-item').eq(1).click();
    cy.get('.ant-select-selection-item').should('have.text', 'ภาษาไทย')
    cy.get('[data-testid="languages-selected"]').click();
    cy.get('.ant-select-item').eq(0).click();
    cy.get('.ant-select-selection-item').should('have.text', 'English')
  });

  it('should visit to Test 1 page', () => {
    cy.get('[data-testid="home"] .container').eq(0).click()
    cy.url().should('include', '/test1');
  })

  it('should not visit any page', () => {
    cy.get('[data-testid="home"] .container').eq(1)
      .should('have.class', 'disable');
  })

  it('should visit to Test 3 page', () => {
    cy.get('[data-testid="home"] .container').eq(2).click()
    cy.url().should('include', '/test3');
  })
  
})