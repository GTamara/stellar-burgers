import { FC } from 'react';

import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/store';
import { TFeeds, TOrder } from '../../utils/data-contracts';
import { feedSelectors } from '../../services/slices/feed.slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
	orders
		.filter((item) => item.status === status)
		.map((item) => item.number)
		.slice(0, 20);

export const FeedInfo: FC = () => {
	/** TODO: взять переменные из стора */

	const feedInfo: TFeeds = useAppSelector(feedSelectors.allFeedsSelector);
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
