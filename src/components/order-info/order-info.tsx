import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
	getOrderByNumber,
	orderSelectors
} from '../../services/slices/order.slice';
import { TOrderResponse } from '../../utils/data-contracts';
import { allIngredientsSelector } from '../../services/selectors/burger-constructor';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
	const dispatch = useAppDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(getOrderByNumber(Number(params.number)));
	}, []);

	/** TODO: взять переменные orderData и ingredients из стора */

	const currentViewedOrderData: TOrderResponse | null = useAppSelector(
		orderSelectors.currentViewedOrderDataSelector
	);

	const allIngredients: TIngredient[] = useAppSelector(
		allIngredientsSelector
	);

	const orderData = {
		createdAt: currentViewedOrderData?.orders[0]?.createdAt || '',
		ingredients: currentViewedOrderData?.orders[0]?.ingredients || [],
		_id: currentViewedOrderData?.orders[0]?._id || '',
		status: currentViewedOrderData?.orders[0]?.status || '',
		name: currentViewedOrderData?.orders[0]?.name || '',
		updatedAt: currentViewedOrderData?.orders[0]?.updatedAt || '',
		number: currentViewedOrderData?.orders[0]?.number || 0
	};

	const ingredients: TIngredient[] = allIngredients.filter((item) =>
		orderData?.ingredients.includes(item._id)
	);

	/* Готовим данные для отображения */
	const orderInfo = useMemo(() => {
		if (!orderData || !ingredients.length) return null;

		const date = new Date(orderData.createdAt);

		type TIngredientsWithCount = {
			[key: string]: TIngredient & { count: number };
		};

		const ingredientsInfo = orderData.ingredients.reduce(
			(acc: TIngredientsWithCount, item) => {
				if (!acc[item]) {
					const ingredient = ingredients.find(
						(ing) => ing._id === item
					);
					if (ingredient) {
						acc[item] = {
							...ingredient,
							count: 1
						};
					}
				} else {
					acc[item].count++;
				}

				return acc;
			},
			{}
		);

		const total = Object.values(ingredientsInfo).reduce(
			(acc, item) => acc + item.price * item.count,
			0
		);

		return {
			...orderData,
			ingredientsInfo,
			date,
			total
		};
	}, [orderData, ingredients]);

	if (!orderInfo) {
		return <Preloader />;
	}

	return <OrderInfoUI orderInfo={orderInfo} />;
};
