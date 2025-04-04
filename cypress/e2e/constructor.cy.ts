import { Interception } from 'cypress/types/net-stubbing';
import { TIngredientsResponse } from '../../src/utils/data-contracts';
import { ConstructorSelectors } from 'cypress/selectors/constructor-selectors';
import { TIngredient } from '@utils-types';
import { debug, log } from 'console';
import { contains } from 'cypress/types/jquery';

describe('Add ingrediends to constructor', () => {
	let ingredientsArray: TIngredient[] = [];
	beforeEach(() => {
		cy.intercept<TIngredientsResponse>('GET', 'api/ingredients', {
			fixture: 'ingredients.json'
		}).as('getIngredientsResponse');
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
			'getUserResponse'
		);
		cy.visit('/');
	});

	it('Constructor page ingredients loaded correctly', () => {
		cy.wait<void, TIngredientsResponse>('@getIngredientsResponse')
			.then(
				({
					request,
					response
				}: Interception<void, TIngredientsResponse>) => {
					assert.isDefined(response && response.body.data);
					if (response) {
						ingredientsArray = response.body.data;
					}

					// console.log(request, response);
				}
			)
			.its('response.statusCode')
			.should('eq', 200);
	});

	it('Add bun to the constructor successfully', () => {
		// cy.wait(['@getIngredientsResponse', '@getUserResponse'])

		const bunTestName = 'Краторная булка N-200i';

		/* найти первую карточку булки в списке ингредиентов */
		cy.get(ConstructorSelectors.INGREDIENTS_SECTION_TITLE)
			.contains('Булки')
			.next('ul')
			.find('li', { timeout: 10000 })
			.first()
			.should('be.visible')
			.then(($firstBunsCard) => {
				/* кликнуть кнопку карточки, чтобы добавить булку в конструктор */
				const bunName = $firstBunsCard
					.find(ConstructorSelectors.INGREDIENT_CARD_NAME)
					.text();
				expect(bunName).to.be.equal(bunTestName);

				$firstBunsCard
					.find(ConstructorSelectors.INGREDIENT_CARD_ADD_BUTTON)
					.click();
			});

		/* Найти элементы конструктора */
		cy.get(
			`${ConstructorSelectors.CONSTRUCTOR} ${ConstructorSelectors.CONSTRUCTOR_BUN_ELEMENT}`
		)
			.should('be.visible')
			/* элементов конструктора должно быть 2 */
			.should('have.length', 2)
			.each(($item) => {
				cy.wrap($item).should('contain', bunTestName);
			});
	});

	it('Add sauce to the constructor successfully', () => {
		const sauceTestName = 'Соус Spicy-X';
		/* Найти кликнуть таб "Соусы", чтобы список соусов оказался в видимой части стараницы */
		cy.get(ConstructorSelectors.INGREDIENTS_TABS_MENU)
			.contains('Соусы')
			.should('be.visible')
			.click();

		/* Найти первый соус в списке соусов */
		cy.get(ConstructorSelectors.INGREDIENTS_SECTION_TITLE)
			.contains('Соусы')
			.next('ul')
			.find('li', { timeout: 10000 })
			.first()
			.should('be.visible')
			.then(($saucesCard) => {
				/* кликнуть кнопку карточки, чтобы добавить соус в конструктор */
				const sauceName = $saucesCard
					.find(ConstructorSelectors.INGREDIENT_CARD_NAME)
					.text();
				expect(sauceName).to.be.equal(sauceTestName);

				$saucesCard
					.find(ConstructorSelectors.INGREDIENT_CARD_ADD_BUTTON)
					.click();
			});

		/* Найти элементы конструктора */
		cy.get(
			`${ConstructorSelectors.CONSTRUCTOR} ${ConstructorSelectors.CONSTRUCTOR_SAUCE_OR_MAIN_ITEM}`
		)
			.should('be.visible')
			/* элементов конструктора должно быть 1 */
			.should('have.length', 1)
			.each(($item) => {
				cy.wrap($item).should('contain', sauceTestName);
			});
	});

	it('Add main to the constructor successfully', () => {
		const mainTestName = 'Биокотлета из марсианской Магнолии';
		/* Найти кликнуть таб "Начинки", чтобы список начинок оказался в видимой части стараницы */
		cy.get(ConstructorSelectors.INGREDIENTS_TABS_MENU)
			.contains('Начинки')
			.should('be.visible')
			.click();

		/* Найти первую начинку в списке начинок */
		cy.get(ConstructorSelectors.INGREDIENTS_SECTION_TITLE)
			.contains('Начинки')
			.next('ul')
			.find('li', { timeout: 10000 })
			.first()
			.should('be.visible')
			.then(($mainCard) => {
				/* кликнуть кнопку карточки, чтобы добавить начинку в конструктор */
				const mainName = $mainCard
					.find(ConstructorSelectors.INGREDIENT_CARD_NAME)
					.text();
				expect(mainName).to.be.equal(mainTestName);

				$mainCard
					.find(ConstructorSelectors.INGREDIENT_CARD_ADD_BUTTON)
					.click();
			});

		/* Найти элементы конструктора */
		cy.get(
			`${ConstructorSelectors.CONSTRUCTOR} ${ConstructorSelectors.CONSTRUCTOR_SAUCE_OR_MAIN_ITEM}`
		)
			.should('be.visible')
			/* элементов конструктора должно быть 1 */
			.should('have.length', 1)
			.each(($item) => {
				cy.wrap($item).should('contain', mainTestName);
			});
	});
});
