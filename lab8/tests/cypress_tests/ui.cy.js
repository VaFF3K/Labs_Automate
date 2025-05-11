describe('UI Tests - Demoblaze Main Page (Cypress)', () => {
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com');
    });
  
    // Тест #1: Кнопка логіну повинна відображатись
    it('Login button should be visible', () => {
      cy.get('#login2').should('be.visible');
    });
  
    // Тест #2: Категорії повинні містити Телефони, Ноутбуки, Монітори
    it('Categories should include Phones, Laptops, Monitors', () => {
      cy.get('.list-group-item').then((items) => {
        const categories = [...items].map(el => el.innerText.trim());
        expect(categories).to.include.members(['Phones', 'Laptops', 'Monitors']);
      });
    });
  
    // Тест #3: Кожен продукт повинен мати назву та ціну
    it('Each product should have title and price', () => {
      cy.get('.card').each(card => {
        cy.wrap(card).find('.card-title').should('exist').and('not.be.empty');
        cy.wrap(card).find('.card-text').should('exist').and('not.be.empty');
      });
    });
  });
  