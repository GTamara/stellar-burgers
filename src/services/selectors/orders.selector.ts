import { createSelector } from '@reduxjs/toolkit';
import { feedSlice } from '../slices/feed.slice';
import { RootState } from '../store';
import { TOrder } from 'src/utils/data-contracts';
import { orderSelectors } from '../slices/order.slice';

export const allOrdersSelector: (state: RootState) => TOrder[] = (
	state: RootState
) => state[feedSlice.name].feeds.orders;

export const findOrderByIdSelector = createSelector(
	[orderSelectors.userOrdersSelector, (_, orderNum: number) => orderNum],
	(orders: TOrder[], orderNum: number) =>
		orders.find((item: TOrder) => item.number === orderNum)
);
