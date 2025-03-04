import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
	AppDispatch,
	useAppDispatch,
	useAppSelector
} from '../../services/store';
import { getAllOrders, getFeeds } from '../../services/slices/order';
import { TFeeds, TOrder } from 'src/utils/data-contracts';
import { getIngredients } from '../../services/slices/burger-constructor';

export const Feed: FC = () => {
	const dispatch: AppDispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getFeeds());
		dispatch(getIngredients());
	}, []);

	// /** TODO: взять переменную из стора */

	const feeds: TFeeds = useAppSelector((state) => state.order.feeds);
	const orders: TOrder[] = (feeds ?? {})?.orders;

	return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
