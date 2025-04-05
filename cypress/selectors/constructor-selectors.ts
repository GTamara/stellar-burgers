const MODULE_PREFIX = 'burger-ingredient-module';

export namespace ConstructorSelectors {
	export const INGREDIENTS_TABS_MENU =
		'ul[class*="burger-ingredients-module__menu"]';

	export const INGREDIENTS_SECTION_TITLE =
		'div[class*="burger-ingredients-module__content"] h3';

	export const INGREDIENT_CARD =
		'a[class^="burger-ingredient-module__article"]';
	export const INGREDIENT_CARD_ADD_BUTTON = `button[class*="${MODULE_PREFIX}__addButton"]`;
	export const INGREDIENT_CARD_NAME = `p[class*="burger-ingredient-module__text"]`;

	export const CONSTRUCTOR =
		'section[class*="burger-constructor-module__burger_constructor"]';
	export const CONSTRUCTOR_BUN_ELEMENT =
		'div[class*="burger-constructor-module__element"]';

	export const CONSTRUCTOR_SAUCE_OR_MAIN_ITEM =
		'li[class*="burger-constructor-element-module__element"]';

	export const POPUP = 'div[class*="modal-module__modal"]';
	export const POPUP_CLOSE_BUTTON = 'button[aria-label="close"]';
	export const POPUP_OVERLAY = 'div[class*="modal-overlay-module__overlay"]';
}
