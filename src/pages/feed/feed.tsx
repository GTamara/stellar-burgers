import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import {
	AppDispatch,
	useAppDispatch,
	useAppSelector
} from '../../services/store';
import { TFeeds, TOrder } from 'src/utils/data-contracts';
import { getIngredients } from '../../services/slices/burger-constructor.slice';
import { feedSelectors } from '../../services/slices/feed.slice';

export const Feed: FC = () => {
	const dispatch: AppDispatch = useAppDispatch();

	const handleGetFeeds = () => {
		dispatch(getIngredients());
	};

	// /** TODO: взять переменную из стора */

	const feeds: TFeeds = useAppSelector(feedSelectors.allFeedsSelector);
	const orders: TOrder[] = (feeds ?? {})?.orders;

	return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
