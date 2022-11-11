describe('Baby Registry', () => {

  const login = () => {
    cy.session('login', () => {
      cy.visit(`https://www.amazon.com/baby-reg/thankyoulist?ref=${Cypress.env('AMAZON_REGISTRY_ID')}`)
      cy.get('#ap_email').type(Cypress.env('AMAZON_EMAIL'))
      cy.get('#continue').click()
      cy.get('#ap_password').type(Cypress.env('AMAZON_PASSWORD'))
      cy.get('#signInSubmit').click()
    });
  };

  it('capture registry', () => {
    // Sign in
    login();
    cy.visit(`https://www.amazon.com/baby-reg/thankyoulist?ref=${Cypress.env('AMAZON_REGISTRY_ID')}`);
    cy.contains('Thank You & Returns');

    // Reset the output file
    cy.writeFile('./output.csv', 'Gift,Name,Address\n');

    cy.get('.br-typ-gift-details')
      .each((element, index) => {
        cy.contains('More details').wait(2000)

        // Get gift
        cy.wrap(element).find('.br-recommendation-item-card .a-section.a-spacing-mini .a-text-bold')
          .invoke('text').then(gift => {
          const trimmedGift = gift.trim();
          cy.log(trimmedGift);
          cy.writeFile('./output.csv', `"${trimmedGift}",`, {flag: 'a+'});
        });

        // Open modal
        cy.wrap(element).find('input').click().wait(2000);
        cy.contains("Gift giver's address:", {timeout: 5000});

        const modalId = `#a-popover-${index + 1}`;
        // Get gifter name
        cy.get(modalId).find('.a-size-small.a-color-secondary.a-text-italic')
          .invoke('text').then(name => {
          const trimmedName = name.replace('By ', '').trim()
          cy.log(trimmedName)
          cy.writeFile('./output.csv', `"${trimmedName}",`, {flag: 'a+'})
        });

        // Get address
        cy.get(modalId).find('.a-section.br-tyl-details-wrapper:nth-child(1) > .a-section:nth-child(2)')
          .invoke('text').then(address => {
          const trimmedAddress = address.replace(new RegExp('(\n)|(\\s{2})', 'g'), '').trim()
          cy.log(trimmedAddress)
          cy.writeFile('./output.csv', `"${trimmedAddress}"\n`, {flag: 'a+'})
        });

        // Close modal
        cy.get(modalId).find('button.a-button-close').wait(2000).click();
      });

  });
});
