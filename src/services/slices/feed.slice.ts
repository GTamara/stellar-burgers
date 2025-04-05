import * as api from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFeeds, TFeedsResponse } from 'src/utils/data-contracts';

export interface FeedState {
	isLoading: boolean;
	error: string | null;
	feeds: TFeeds;
}

const initialState: FeedState = {
	isLoading: false,
	error: null,
	feeds: { orders: [], total: 0, totalToday: 0 }
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	selectors: {
		isLoadingSelictor: (state) => state.isLoading,
		allFeedsSelector: (state) => state.feeds,
		allFeedOrdersSelector: (state) => state.feeds.orders
	},
	extraReducers: (builder) => {
		builder.addCase(getFeed.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getFeed.rejected, (state, action) => {
			state.isLoading = false;
			state.error = `Ошибка получения списка заказов. ${action.error.message}`;
		});
		builder.addCase(getFeed.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.feeds = payload;
		});
	}
});

export const getFeed = createAsyncThunk<TFeedsResponse>(
	'order/getFeeds',
	api.getFeedsApi
);

export default feedSlice.reducer;
export const feedSelectors = feedSlice.selectors;
