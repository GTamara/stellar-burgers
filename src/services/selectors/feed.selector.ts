import { createSelector } from '@reduxjs/toolkit';
import { feedSelectors } from '../slices/feed.slice';
import { TOrder } from 'src/utils/data-contracts';

export const findFeedByIdSelector = createSelector(
	[feedSelectors.allFeedOrdersSelector, (_, feedNum: number) => feedNum],
	(feedOrders: TOrder[], feedNum: number) =>
		feedOrders.find((item: TOrder) => item.number === feedNum)
);
