import * as api from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EIngredientType, TIngredient, TTabMode } from '@utils-types';
import * as selectors from '../selectors';

export interface ConstructorState {
	// isInit: boolean;
	isLoading: boolean;
	// user: User | null;
	error: string | null;
	currentTab: EIngredientType;
	allIngredients: TIngredient[];
	ingredientsByType: {
		[EIngredientType.bun]: TIngredient[];
		[EIngredientType.main]: TIngredient[];
		[EIngredientType.sauce]: TIngredient[];
	};
}

const initialState: ConstructorState = {
	// isInit: false,
	isLoading: false,
	// user: null,
	error: null,
	currentTab: EIngredientType.bun,
	allIngredients: [],
	ingredientsByType: {
		[EIngredientType.bun]: [],
		[EIngredientType.main]: [],
		[EIngredientType.sauce]: []
	}
};

export const constructorSlice = createSlice({
	name: 'burger-constructor',
	initialState,
	reducers: {
		// init: (state) => {
		// 	state.isInit = true;
		// },
		// logout: (state) => {
		//     state.user = null;
		// }
	},
	selectors: {
		selectIsLoading: (state) => state.isLoading
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
			// console.log("FULFILLED");
			state.isLoading = false;
			state.currentTab = EIngredientType.bun;
			state.allIngredients = action.payload;
			state.ingredientsByType = {
				[EIngredientType.bun]:
					selectors.specifiedTypeIngredientsSelector(
						action.payload,
						EIngredientType.bun
					),
				[EIngredientType.main]:
					selectors.specifiedTypeIngredientsSelector(
						action.payload,
						EIngredientType.main
					),
				[EIngredientType.sauce]:
					selectors.specifiedTypeIngredientsSelector(
						action.payload,
						EIngredientType.sauce
					)
			};
		});
	}
});

export const getIngredients = createAsyncThunk(
	'burger-constructor/getIngredients',
	async () =>
		// console.log('getIngredientsThunk!!!!');
		api.getIngredientsApi()
);

// export const {init, logout} = userSlice.actions;

export default constructorSlice.reducer;
export const { selectIsLoading } = constructorSlice.selectors;
