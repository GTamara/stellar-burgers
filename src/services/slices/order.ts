import * as api from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EIngredientType, TIngredient, TTabMode } from '@utils-types';
import * as selectors from '../selectors';
import { TFeeds, TFeedsResponse, TOrder } from 'src/utils/data-contracts';

export interface OrderState {
	// isInit: boolean;
	isLoading: boolean;
	// user: User | null;
	error: string | null;
	// allOrders: TOrder[];
	feeds: TFeeds;
}

const initialState: OrderState = {
	// isInit: false,
	isLoading: false,
	// user: null,
	error: null,
	// allOrders: [],
	feeds: { orders: [], total: 0, totalToday: 0 }
};

export const orderSlice = createSlice({
	name: 'order',
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
		// builder.addCase(getAllOrders.pending, (state) => {
		// 	// console.log("PENDING");
		// 	state.isLoading = true;
		// });
		// builder.addCase(getAllOrders.rejected, (state, action) => {
		// 	// console.log("REJECTED");
		// 	state.isLoading = false;
		// 	state.error = action.error.message ?? null;
		// });
		// builder.addCase(getAllOrders.fulfilled, (state, action) => {
		// 	// console.log("FULFILLED");
		// 	state.isLoading = false;
		// 	state.allOrders = action.payload;
		// });

		builder.addCase(getFeeds.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getFeeds.rejected, (state) => {
			// state.isInit = true;
			state.isLoading = false;
		});
		builder.addCase(getFeeds.fulfilled, (state, { payload }) => {
			// state.isInit = true;
			state.isLoading = false;
			state.feeds = payload;
		});
	}
});

export const getAllOrders = createAsyncThunk('order/getAllOrders', async () =>
	// console.log('getIngredientsThunk!!!!');
	api.getOrdersApi()
);

export const getFeeds = createAsyncThunk('order/getFeeds', async () =>
	// console.log('getIngredientsThunk!!!!');
	api.getFeedsApi()
);

// export const {init, logout} = userSlice.actions;

export default orderSlice.reducer;
export const { selectIsLoading } = orderSlice.selectors;
