import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
	getOrders,
	userProfileSliceSelectors
} from '../../services/slices/user-profile.slice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
	/** TODO: взять переменную из стора */
	const orders = useAppSelector(userProfileSliceSelectors.ordersSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getOrders());
	}, []);

	return <ProfileOrdersUI orders={orders} />;
};
