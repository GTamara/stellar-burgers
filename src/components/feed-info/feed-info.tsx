import { FC, useEffect } from 'react';

import { FeedInfoUI } from '../ui/feed-info';
import {
	AppDispatch,
	useAppDispatch,
	useAppSelector
} from '../../services/store';
import { getAllOrders, getFeeds } from '../../services/slices/order';
import { TFeedsResponse, TOrder } from '../../utils/data-contracts';

const getOrders = (orders: TOrder[], status: string): number[] =>
	orders
		.filter((item) => item.status === status)
		.map((item) => item.number)
		.slice(0, 20);

type FeedInfoProps = {
	orders: TOrder[];
};

export const FeedInfo: FC = () => {
	// const dispatch: AppDispatch = useAppDispatch();
	// useEffect(() => {
	// 	// dispatch(getAllOrders());
	// 	dispatch(getFeeds());
	// }, []);

	/** TODO: взять переменные из стора */

	const feedInfo: TFeedsResponse = useAppSelector(
		(state) => state.order.feeds
	) as TFeedsResponse; // {};
	const { orders, ...feed } = feedInfo;

	const readyOrders: number[] = getOrders(orders, 'done');
	const pendingOrders: number[] = getOrders(orders, 'pending');

	return (
		<FeedInfoUI
			readyOrders={readyOrders}
			pendingOrders={pendingOrders}
			feed={feed}
		/>
	);
};
