import * as api from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EIngredientType, TConstructorIngredient } from '@utils-types';
import { TNewOrderResponse, TOrderResponse } from 'src/utils/data-contracts';

export interface OrderState {
	isLoading: boolean;
	error: string | null;
	newOrderIngredients: Array<TConstructorIngredient>; // TIngredient[];

	orderRequest: boolean;
	orderModalData: TNewOrderResponse | null;

	currentViewedOrderData: TOrderResponse | null;
}

const initialState: OrderState = {
	isLoading: false,
	error: null,
	newOrderIngredients: [],

	orderRequest: false,
	orderModalData: null,

	currentViewedOrderData: null
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addNewOrderIngredient: (state, { payload }) => {
			payload.id = state.newOrderIngredients.length.toString();
			if (payload.type === EIngredientType.bun) {
				state.newOrderIngredients = state.newOrderIngredients.filter(
					(item) => item.type !== EIngredientType.bun
				);
			}
			state.newOrderIngredients.push(payload);
		},
		removeNewOrderIngredient: (state, action: PayloadAction<string>) => {
			state.newOrderIngredients = state.newOrderIngredients.filter(
				(item) => item.id !== action.payload
			);
		},
		setOrderRequest: (state, action: PayloadAction<boolean>) => {
			state.orderRequest = action.payload;
		}
	},
	selectors: {
		isLoadingSelector: (state) => state.isLoading,
		newOrderIngredientsSelector: (state) => state.newOrderIngredients,
		orderRequestSelector: (state) => state.orderRequest,
		orderModalDataSelector: (state) => state.orderModalData,
		currentViewedOrderDataSelector: (state) => state.currentViewedOrderData
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

export default orderSlice.reducer;
export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
