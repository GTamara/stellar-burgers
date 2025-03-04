import { TOrder } from 'src/utils/data-contracts';

export type FeedUIProps = {
	orders: TOrder[];
	handleGetFeeds: () => void;
};
