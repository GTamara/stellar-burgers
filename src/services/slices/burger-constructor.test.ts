import { TConstructorIngredient } from '@utils-types';
import {
	constructorSlice,
	burgerConstructorActions,
	getIngredients
} from './burger-constructor.slice';
import * as constructorTestData from '../../test-data/constructor-data';

describe('burger-constructor slice', () => {
	describe('add ingredient', () => {
		test('Add bun. New bun replaces the previous one', () => {
			const newState = constructorSlice.reducer(
				{ ...constructorTestData.INITIAL_STATE },
				burgerConstructorActions.addNewOrderIngredient(
					constructorTestData.NEW_BUN_INGREDIENT
				)
			);
			expect(newState.burgerConstructor.bun).toEqual(
				constructorTestData.NEW_BUN_INGREDIENT
			);

			expect(newState).toEqual({
				...constructorTestData.INITIAL_STATE,
				burgerConstructor: {
					ingredients:
						constructorTestData.INITIAL_STATE.burgerConstructor
							.ingredients,
					bun: constructorTestData.NEW_BUN_INGREDIENT
				}
			});
		});

		test('Add bun. There is no bun in the constructor', () => {
			const initialState = {
				...constructorTestData.INITIAL_STATE
			};
			initialState.burgerConstructor.bun = null;
			const newState = constructorSlice.reducer(
				initialState,
				burgerConstructorActions.addNewOrderIngredient(
					constructorTestData.NEW_BUN_INGREDIENT
				)
			);
			expect(newState.burgerConstructor.bun).toEqual(
				constructorTestData.NEW_BUN_INGREDIENT
			);
		});

		const ingredients = [
			constructorTestData.NEW_SAUCE_INGREDIENT,
			constructorTestData.NEW_MAIN_INGREDIENT
		];
		ingredients.map((ingredient: TConstructorIngredient) => {
			test(`Add ingredient. Add ${ingredient.type}`, () => {
				const newState = constructorSlice.reducer(
					{ ...constructorTestData.INITIAL_STATE },
					burgerConstructorActions.addNewOrderIngredient(ingredient)
				);
				expect(newState.burgerConstructor.ingredients).toContainEqual(
					ingredient
				);

				expect(newState).toEqual({
					...constructorTestData.INITIAL_STATE,
					burgerConstructor: {
						...constructorTestData.INITIAL_STATE.burgerConstructor,
						ingredients: [
							...constructorTestData.INITIAL_STATE
								.burgerConstructor.ingredients,
							ingredient
						]
					}
				});
			});
		});
	});

	describe('remove ingredient', () => {
		const ingredients = [
			constructorTestData.NEW_SAUCE_INGREDIENT,
			constructorTestData.NEW_MAIN_INGREDIENT
		];

		ingredients.map((ingredient: TConstructorIngredient) => {
			it(`Remove ${ingredient.type}`, () => {
				const initialState = { ...constructorTestData.INITIAL_STATE };
				const newState = constructorSlice.reducer(
					initialState,
					burgerConstructorActions.removeNewOrderIngredient(
						ingredient
					)
				);
				expect(
					newState.burgerConstructor.ingredients
				).not.toContainEqual(ingredient);
				const filteredIngredients =
					initialState.burgerConstructor.ingredients.filter(
						(item) => item.id !== ingredient.id
					);
				expect(newState.burgerConstructor.ingredients).toEqual(
					filteredIngredients
				);
			});
		});
	});

	describe('Reorder ingredients ->', () => {
		it.each([
			[0, 1],
			[1, 0]
		])('reorder from %i to %i', (from, to) => {
			const initialState = { ...constructorTestData.INITIAL_STATE };
			const newState = constructorSlice.reducer(
				initialState,
				burgerConstructorActions.reorderConstructor({ from, to })
			);
			expect(newState.burgerConstructor.ingredients[from]).toEqual(
				initialState.burgerConstructor.ingredients[to]
			);
			expect(newState.burgerConstructor.ingredients[to]).toEqual(
				initialState.burgerConstructor.ingredients[from]
			);
		});
	});

	describe('get Ingredients ->', () => {
		it(`burger-constructor/getIngredients/pending is dispatched. Then 
			isLoading = true  & error = null`, () => {
			const initialState = {
				...constructorTestData.INITIAL_STATE,
				error: new Error('error')
			};
			const action = getIngredients.pending('');
			const newState = constructorSlice.reducer(initialState, action);
			expect(newState).toEqual({
				...initialState,
				isLoading: true,
				error: null
			});
		});

		it(`burger-constructor/getIngredients/fulfilled is dispatched. Then 
			isLoading = false & error = null 
			& ingredients response data is stored in "allIngredients" state field`, () => {
			const initialState = {
				...constructorTestData.INITIAL_STATE,
				isLoading: true
			};
			const action = getIngredients.fulfilled(
				constructorTestData.GET_INGREDIENTS_DATA,
				''
			);
			const newState = constructorSlice.reducer(initialState, action);
			expect(newState).toEqual({
				...initialState,
				isLoading: false,
				error: null,
				allIngredients: constructorTestData.GET_INGREDIENTS_DATA
			});
		});

		it(`burger-constructor/getIngredients/rejected is dispatched. Then 
			isLoading = false & error = action.error.message`, () => {
			const initialState = {
				...constructorTestData.INITIAL_STATE,
				isLoading: true
			};
			const action = getIngredients.rejected(new Error('error'), '');
			const newState = constructorSlice.reducer(initialState, action);
			expect(newState.error).toContain(action.error.message);
			expect(newState.isLoading).toBe(false);
		});
	});
});
