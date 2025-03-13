import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
	getOrderByNumber,
	orderSelectors
} from '../../services/slices/order.slice';
import { TOrder, TOrderResponse } from '../../utils/data-contracts';
import { allIngredientsSelector } from '../../services/selectors/burger-constructor.selector';
import { useLocation, useParams } from 'react-router-dom';
import { findFeedByIdSelector } from '../../services/selectors/feed.selector';
import { findOrderByIdSelector } from '../../services/selectors/orders.selector';

export const OrderInfo: FC = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const location = useLocation();
	const backgroundLocation = location.state?.background || null;

	let popupDataSelector:
		| typeof findOrderByIdSelector
		| typeof findFeedByIdSelector;

	if (location.pathname.startsWith('/profile/orders')) {
		popupDataSelector = findOrderByIdSelector;
	} else if (location.pathname.startsWith('/feed')) {
		popupDataSelector = findFeedByIdSelector;
	}

	const popupData: TOrder | undefined = useAppSelector((state) =>
		popupDataSelector(state, Number(params.number))
	);

	useEffect(() => {
		// если попап открыли по прямой ссылке
		if (!backgroundLocation) {
			dispatch(getOrderByNumber(Number(params.number)));
		}
	}, []);

	/** TODO: взять переменные orderData и ingredients из стора */

	const currentViewedOrderData: TOrderResponse | null = useAppSelector(
		orderSelectors.currentViewedOrderDataSelector
	);

	const allIngredients: TIngredient[] = useAppSelector(
		allIngredientsSelector
	);

	const data =
		(currentViewedOrderData?.orders[0] as TOrder) || (popupData as TOrder);

	const orderData = {
		createdAt: data?.createdAt || '',
		ingredients: data?.ingredients || [],
		_id: data?._id || '',
		status: data?.status || '',
		name: data?.name || '',
		updatedAt: data?.updatedAt || '',
		number: data?.number || 0
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
