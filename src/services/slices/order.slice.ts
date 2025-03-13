import * as api from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EIngredientType, TConstructorIngredient } from '@utils-types';
import {
	TNewOrderResponse,
	TOrder,
	TOrderResponse
} from 'src/utils/data-contracts';

export interface OrderState {
	isLoading: boolean;
	error: string | null;
	orderRequest: boolean;
	orderModalData: TNewOrderResponse | null;
	currentViewedOrderData: TOrderResponse | null;

	userOrders: TOrder[];
}

const initialState: OrderState = {
	isLoading: false,
	error: null,
	orderRequest: false,
	orderModalData: null,
	currentViewedOrderData: null,
	userOrders: []
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrderRequest: (state, action: PayloadAction<boolean>) => {
			state.orderRequest = action.payload;
		},
		clearOrderModalData: (state) => {
			state.orderModalData = null;
		}
	},
	selectors: {
		isLoadingSelector: (state) => state.isLoading,
		orderRequestSelector: (state) => state.orderRequest,
		orderModalDataSelector: (state) => state.orderModalData,
		currentViewedOrderDataSelector: (state) => state.currentViewedOrderData,

		userOrdersSelector: (state) => state.userOrders
	},
	extraReducers: (builder) => {
		builder.addCase(orderBurger.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(orderBurger.rejected, (state) => {
			state.isLoading = false;
			state.error = state.error;
		});
		builder.addCase(orderBurger.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.orderModalData = payload;
		});

		builder.addCase(getOrderByNumber.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getOrderByNumber.rejected, (state, action) => {
			state.isLoading = false;
			state.error = `Ошибка получения данных заказа. ${action.error.message}`;
		});
		builder.addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.currentViewedOrderData = payload;
		});

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
				state.userOrders = action.payload;
			}
		);
	}
});

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
	'order/orderBurger',
	async (data: string[]) => api.orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk<TOrderResponse, number>(
	'order/getOrderByNumber',
	async (data: number) => api.getOrderByNumberApi(data)
);

export const getOrders = createAsyncThunk(
	'user-profile/getOrders',
	api.getOrdersApi
);

export default orderSlice.reducer;
export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
