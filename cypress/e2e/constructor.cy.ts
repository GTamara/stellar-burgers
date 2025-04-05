import { Interception } from 'cypress/types/net-stubbing';
import { TIngredientsResponse } from '../../src/utils/data-contracts';
import { ConstructorSelectors } from 'cypress/selectors/constructor-selectors';

describe('Add ingrediends to constructor', () => {
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
						console.log(response.body.data);
					}
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
			.then(($firstBunCard) => {
				/* кликнуть кнопку карточки, чтобы добавить булку в конструктор */
				const bunName = $firstBunCard
					.find(ConstructorSelectors.INGREDIENT_CARD_NAME)
					.text();
				expect(bunName).to.be.equal(bunTestName);

				$firstBunCard
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

describe.only('constructor modal works as expected', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', {
			fixture: 'ingredients.json'
		}).as('getIngredientsResponse');
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
			'getUserResponse'
		);
		cy.visit('/');
	});

	it('Ingredient details modal opened after card click', () => {
		/* Кликнуть для разнообразия вторую карточку */
		cy.get(ConstructorSelectors.INGREDIENT_CARD)
			.eq(1)
			.should('be.visible')
			.click();

		/* Проверить, что модалка открылась */
		cy.get(ConstructorSelectors.POPUP)
			.should('be.visible')
			.should('contain', 'Детали ингредиента');
	});

	it('Ingredient details modal closed after close button click', () => {
		/* Кликнуть для разнообразия вторую карточку */
		cy.get(ConstructorSelectors.INGREDIENT_CARD)
			.eq(1)
			.should('be.visible')
			.click();

		/* Найти кнопку закрытия попапа и кликнуть ее */
		cy.get(ConstructorSelectors.POPUP_CLOSE_BUTTON)
			.should('be.visible')
			.click();

		/* Проверить, что модалка закрылась */
		cy.get(ConstructorSelectors.POPUP).should('not.exist');
	});

	it('Ingredient details modal closed after overlay click', () => {
		/* Кликнуть для разнообразия вторую карточку */
		cy.get(ConstructorSelectors.INGREDIENT_CARD)
			.eq(1)
			.should('be.visible')
			.click();

		/* Найти оверлей и кликнуть */
		cy.get(ConstructorSelectors.POPUP_OVERLAY).click({ force: true });

		/* Проверить, что модалка закрылась */
		cy.get(ConstructorSelectors.POPUP).should('not.exist');
	});
});
