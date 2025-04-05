import * as feedTestData from '../../test-data/feed-data';
import { feedSlice, getFeed } from './feed.slice';

describe('Get feed', () => {
	it('feed/getFeeds/pending is dispatched. Then isLoading = true  & error = null', () => {
		const initialState = {
			...feedTestData.INITIAL_STATE,
			error: new Error('error')
		};

		const newState = feedSlice.reducer(initialState, getFeed.pending(''));

		expect(newState).toEqual({
			...initialState,
			isLoading: true
		});
	});

	it(`feed/getFeeds/fulfilled is dispatched. Then 
			isLoading = false & error = null & feed response data is stored in "feeds" state field`, () => {
		const initialState = {
			...feedTestData.INITIAL_STATE,
			isLoading: true
		};

		const newState = feedSlice.reducer(
			initialState,
			getFeed.fulfilled(feedTestData.FEED_RESPONSE, '')
		);

		expect(newState.isLoading).toBe(false);
		expect(newState).toEqual({
			...feedTestData.INITIAL_STATE,
			feeds: {
				orders: feedTestData.FEED_RESPONSE.orders,
				total: feedTestData.FEED_RESPONSE.total,
				totalToday: feedTestData.FEED_RESPONSE.totalToday
			}
		});
	});

	it(`feed/getFeeds/rejected is dispatched. Then 
			isLoading = false & error = error message`, () => {
		const initialState = {
			...feedTestData.INITIAL_STATE,
			isLoading: true
		};

		const newState = feedSlice.reducer(
			initialState,
			getFeed.rejected(new Error('error'), '')
		);
		expect(newState.isLoading).toBe(false);
		expect(newState.error).toContain('error');
	});

	// beforeAll(() => {
	// 	global.fetch = jest.fn(() =>
	//         Promise.resolve({
	//             json: () => Promise.resolve(feedTestData.FEED_RESPONSE),
	//         })
	//     ) as jest.Mock;

	// })

	// afterAll(() => {
	// 	jest.restoreAllMocks();
	// });
});
