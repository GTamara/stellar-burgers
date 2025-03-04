import { ProfileOrdersUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
import { FC } from 'react';
import { TOrder } from 'src/utils/data-contracts';

export const ProfileOrders: FC = () => {
	/** TODO: взять переменную из стора */
	const orders: TOrder[] = [];

	return <ProfileOrdersUI orders={orders} />;
};
