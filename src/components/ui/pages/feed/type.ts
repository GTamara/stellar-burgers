import { TOrder } from '../../../../utils/data-contracts';

export type FeedUIProps = {
	orders: TOrder[];
	handleGetFeeds: () => void;
};
