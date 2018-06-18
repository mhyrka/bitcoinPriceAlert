describe('Tests for BTC Price Alert', () => {
  it('Has basic front-end functionality', () => {
    cy.visit('/')
    cy.get('h1').should('have.text', 'coin alert')
    cy.get('h2').should('exist')
    cy.get('.currency-options').children().should('have.length', '4')
    cy.get('#percentGain').children().should('have.length', '4')
    cy.get('#percentLoss').children().should('have.length', '4')

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('button').click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Alert Set!')
    })
  })
})
