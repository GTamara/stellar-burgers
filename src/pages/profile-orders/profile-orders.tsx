import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { getOrders, orderSelectors } from '../../services/slices/order.slice';

export const ProfileOrders: FC = () => {
	/** TODO: взять переменную из стора */
	const orders = useAppSelector(orderSelectors.userOrdersSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getOrders());
	}, []);

	return <ProfileOrdersUI orders={orders} />;
};
