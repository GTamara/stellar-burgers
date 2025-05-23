import * as api from '@api';
import { BurgerConstructor } from '@components';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	EIngredientType,
	TConstructorIngredient,
	TIngredient
} from '@utils-types';

export interface ConstructorState {
	isLoading: boolean;
	error: string | null;
	currentTab: EIngredientType;
	allIngredients: TIngredient[];
	burgerConstructor: {
		bun: TConstructorIngredient | null;
		ingredients: TConstructorIngredient[];
	};
}

const initialState: ConstructorState = {
	isLoading: false,
	error: null,
	currentTab: EIngredientType.bun,
	allIngredients: [],
	burgerConstructor: {
		bun: null,
		ingredients: []
	}
};

export const constructorSlice = createSlice({
	name: 'burger-constructor',
	initialState,
	selectors: {
		burgerConstructorSelector: (state: ConstructorState) =>
			state.burgerConstructor
	},
	reducers: {
		addNewOrderIngredient: (
			state,
			action: PayloadAction<TConstructorIngredient>
		) => {
			const newItem = action.payload;
			if (newItem.type === EIngredientType.bun) {
				state.burgerConstructor.bun = newItem;
			} else if (
				newItem.type === EIngredientType.sauce ||
				newItem.type === EIngredientType.main
			) {
				state.burgerConstructor.ingredients.push(newItem);
			} else {
				console.error('Неправильный тип ингредиента');
			}
		},
		removeNewOrderIngredient: (
			state,
			action: PayloadAction<TConstructorIngredient>
		) => {
			if (action.payload.type === EIngredientType.bun) {
				return;
			} else if (
				action.payload.type === EIngredientType.sauce ||
				action.payload.type === EIngredientType.main
			) {
				state.burgerConstructor.ingredients =
					state.burgerConstructor.ingredients.filter(
						(item) => item.id !== action.payload.id
					);
			}
		},
		clearConstructor: (state) => {
			// state.burgerConstructor.bun = null;
			// state.burgerConstructor.ingredients = [];

			state.burgerConstructor = {
				bun: null,
				ingredients: []
			};
		},
		reorderConstructor: (
			state,
			{ payload }: PayloadAction<{ from: number; to: number }>
		) => {
			const { from, to } = payload;
			const ingredients = [...state.burgerConstructor.ingredients];
			ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
			state.burgerConstructor.ingredients = ingredients;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getIngredients.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getIngredients.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message ?? null;
		});
		builder.addCase(getIngredients.fulfilled, (state, action) => {
			state.isLoading = false;
			state.currentTab = EIngredientType.bun;
			state.allIngredients = action.payload;
		});
	}
});

export const getIngredients = createAsyncThunk<TIngredient[]>(
	'burger-constructor/getIngredients',
	api.getIngredientsApi
);

export default constructorSlice.reducer;
export const burgerConstructorActions = constructorSlice.actions;
export const burgerConstructorSelectors = constructorSlice.selectors;
