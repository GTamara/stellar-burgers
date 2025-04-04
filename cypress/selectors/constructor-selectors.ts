const MODULE_PREFIX = 'burger-ingredient-module';

export namespace ConstructorSelectors {
	export const INGREDIENTS_TABS_MENU =
		'ul[class*="burger-ingredients-module__menu"]';
	// export const INGREDIENTS_TAB = 'li[class*="burger-ingredients-module__tab"]';

	export const INGREDIENTS_SECTION_TITLE =
		'div[class*="burger-ingredients-module__content"] h3'; // [class*="burger-ingredients-module__title"]

	export const INGREDIENT_CARD =
		'a[class^="burger-ingredient-module__article"]';
	export const INGREDIENT_CARD_ADD_BUTTON = `button[class*="${MODULE_PREFIX}__addButton"]`;
	export const INGREDIENT_CARD_NAME = `p[class*="burger-ingredient-module__text"]`;

	export const CONSTRUCTOR =
		'section[class*="burger-constructor-module__burger_constructor"]';
	export const CONSTRUCTOR_BUN_ELEMENT =
		'div[class*="burger-constructor-module__element"]';
	export const CONSTRUCTOR_ELEMENT_TITLE = '.constructor-element__text';
	export const CONSTRUCTOR_ELEMENTS_LIST =
		'ul[class*="burger-constructor-module__elements"]';
	export const CONSTRUCTOR_SAUCE_OR_MAIN_ITEM =
		'li[class*="burger-constructor-element-module__element"]';
}
