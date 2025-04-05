import { ConstructorSelectors } from 'cypress/selectors/constructor-selectors';
import { OrderSelectors } from 'cypress/selectors/order-selectors';

describe('order modal works as expected', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', {
			fixture: 'ingredients.json'
		}).as('getIngredientsResponse');
		cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
			'createOrderResponse'
		);
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
			'getUserResponse'
		);

		cy.visit('/');
	});

	it('Order burger successfully', () => {
		/* Добавить булку и 1 ингредиент в конструктор */
		cy.get(ConstructorSelectors.INGREDIENT_CARD)
			.eq(0)
			.parent()
			.find(ConstructorSelectors.INGREDIENT_CARD_ADD_BUTTON)
			.click();

		cy.get(ConstructorSelectors.INGREDIENT_CARD)
			.eq(1)
			.parent()
			.find(ConstructorSelectors.INGREDIENT_CARD_ADD_BUTTON)
			.click();

		/* Кликнуть кнопку "Оформить заказ" */
		cy.get('button').contains('Оформить заказ').click();

		/* Проверить, что модалка открылась */
		cy.get(ConstructorSelectors.POPUP)
			.should('be.visible')
			.should('have.length', 1)
			.should('contain', 'Ваш заказ начали готовить')
			.then(($popup) => {
				cy.wrap($popup)
					.find(OrderSelectors.ORDER_NUMBER)
					.should('be.visible')
					/*  Проверить, что в модалке отображается правильный номер заказа */
					.should('contain', '72981');
			});
	});
});
