import { FeedState } from 'src/services/slices/feed.slice';
import { TFeedsResponse } from 'src/utils/data-contracts';

const INITIAL_STATE: FeedState = {
	isLoading: false,
	error: null,
	feeds: {
		orders: [],
		total: 0,
		totalToday: 0
	}
};

const FEED_RESPONSE: TFeedsResponse = {
	success: true,
	total: 3,
	totalToday: 1,
	orders: [
		{
			_id: '67e69d38ea327c001cf3085f',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093d'
			],
			status: 'done',
			name: 'Флюоресцентный люминесцентный бургер',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			number: 72500
		},
		{
			_id: '67e69a08ea327c001cf30851',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa0943',
				'643d69a5c3f7b9001cfa0945',
				'643d69a5c3f7b9001cfa093f',
				'643d69a5c3f7b9001cfa093d'
			],
			status: 'done',
			name: 'Space флюоресцентный антарианский бессмертный бургер',
			createdAt: '2025-03-28T12:46:00.464Z',
			updatedAt: '2025-03-28T12:46:01.193Z',
			number: 72499
		},
		{
			_id: '67e69968ea327c001cf3084f',
			ingredients: [
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093f',
				'643d69a5c3f7b9001cfa0944',
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093d'
			],
			status: 'done',
			name: 'Традиционный-галактический флюоресцентный люминесцентный бессмертный бургер',
			createdAt: '2025-03-28T12:43:20.677Z',
			updatedAt: '2025-03-28T12:43:21.291Z',
			number: 72498
		}
	]
};

export { INITIAL_STATE, FEED_RESPONSE };
