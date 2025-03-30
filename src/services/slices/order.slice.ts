import * as api from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TFeedsResponse,
	TNewOrderResponse,
	TOrder,
	TOrderResponse
} from '../../utils/data-contracts';

export interface OrderState {
	isLoading: boolean;
	error: Error | string | null;
	orderRequest: boolean;
	orderModalData: TNewOrderResponse | null;
	currentViewedOrderData: TOrderResponse | null;

	userOrders: TOrder[];
}

export const initialState: OrderState = {
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
		builder
			.addCase(orderBurger.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(orderBurger.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка при оформлении заказа. ${action.error.message}`;
			})
			.addCase(orderBurger.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.orderModalData = payload;
				state.error = null;
			});

		builder
			.addCase(getOrderByNumber.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getOrderByNumber.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка получения данных заказа. ${action.error.message}`;
			})
			.addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.currentViewedOrderData = payload;
				state.error = null;
			});

		builder
			.addCase(getOrders.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка при получении заказов. ${action.error.message}`;
			})
			.addCase(
				getOrders.fulfilled,
				(state, action: PayloadAction<TOrder[]>) => {
					state.isLoading = false;
					state.userOrders = action.payload;
					state.error = null;
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
