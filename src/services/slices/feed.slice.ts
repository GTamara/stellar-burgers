import * as api from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFeeds, TFeedsResponse } from '../../utils/data-contracts';

export interface FeedState {
	isLoading: boolean;
	error: Error | string | null;
	feeds: TFeeds;
}

export const initialState: FeedState = {
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
		builder
			.addCase(getFeed.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFeed.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка получения списка заказов. ${action.error.message}`;
			})
			.addCase(getFeed.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				const feeds: TFeeds = Object.fromEntries(
					Object.entries(payload).filter(
						([key, _]) => key !== 'success'
					)
				) as TFeeds;
				state.feeds = feeds;
			});
	}
});

export const getFeed = createAsyncThunk<TFeedsResponse>(
	'feed/getFeeds',
	api.getFeedsApi
);

export default feedSlice.reducer;
export const feedSelectors = feedSlice.selectors;
