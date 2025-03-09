import * as api from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EIngredientType, TIngredient } from '@utils-types';

export interface ConstructorState {
	isLoading: boolean;
	error: string | null;
	currentTab: EIngredientType;
	allIngredients: TIngredient[];
}

const initialState: ConstructorState = {
	isLoading: false,
	error: null,
	currentTab: EIngredientType.bun,
	allIngredients: []
};

export const constructorSlice = createSlice({
	name: 'burger-constructor',
	initialState,
	reducers: {},
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
	async () => api.getIngredientsApi()
);

export default constructorSlice.reducer;
