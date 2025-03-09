import * as api from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from 'src/utils/data-contracts';

export interface UserProfileState {
	isLoading: boolean;
	error: string | null;
	orders: TOrder[];
}

const initialState: UserProfileState = {
	isLoading: false,
	error: null,
	orders: []
};

export const userProfileSlice = createSlice({
	name: 'user-profile',
	initialState,
	reducers: {},
	selectors: {
		isLoadingSelictor: (state) => state.isLoading,
		errorSelector: (state) => state.error,
		ordersSelector: (state) => state.orders
	},
	extraReducers: (builder) => {
		builder.addCase(getOrders.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getOrders.rejected, (state, action) => {
			state.isLoading = false;
			state.error = `Ошибка при получении заказов. ${action.error.message}`;
		});
		builder.addCase(
			getOrders.fulfilled,
			(state, action: PayloadAction<TOrder[]>) => {
				state.isLoading = false;
				state.orders = action.payload;
			}
		);
	}
});

export const getOrders = createAsyncThunk('user-profile/getOrders', async () =>
	api.getOrdersApi()
);

export const userProfileSliceSelectors = userProfileSlice.selectors;
