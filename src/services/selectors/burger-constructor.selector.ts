import { createSelector } from '@reduxjs/toolkit';
import { constructorSlice } from '../slices/burger-constructor.slice';
import { RootState } from '../store';
import { TIngredient } from '@utils-types';

export const allIngredientsSelector = (state: RootState) =>
	state[constructorSlice.name].allIngredients;

export const findIngredientByIdSelector = createSelector(
	[allIngredientsSelector, (_, id) => id],
	(allIngredients: TIngredient[], id: string) =>
		allIngredients.find((item: TIngredient) => item._id === id)
);

export const isLoadingSelector = (state: RootState) =>
	state[constructorSlice.name].isLoading;
