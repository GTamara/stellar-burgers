import { FC, useMemo } from 'react';
import { EIngredientType, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
	orderActions,
	orderBurger,
	orderSelectors
} from '../../services/slices/order.slice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authSelectors } from '../../services/slices/auth.slice';
import { TOrder } from 'src/utils/data-contracts';

export const BurgerConstructor: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const isUserLoggedIn = !!useAppSelector(authSelectors.userSelector);

	/** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
	const newOrderIngredients = useAppSelector(
		orderSelectors.newOrderIngredientsSelector
	);

	const constructorItems: {
		bun: TConstructorIngredient | undefined;
		ingredients: TConstructorIngredient[];
	} = {
		bun: newOrderIngredients.find(
			(item) => item?.type === EIngredientType.bun
		),
		ingredients: newOrderIngredients.filter(
			(item) => item?.type !== EIngredientType.bun
		)
	};

	const orderRequest: boolean = useAppSelector(
		orderSelectors.orderRequestSelector
	);

	const orderModalData: TOrder | undefined = useAppSelector(
		orderSelectors.orderModalDataSelector
	)?.order;

	const onOrderClick = () => {
		if (!constructorItems.bun || orderRequest) return;

		dispatch(orderActions.setOrderRequest(true));

		dispatch(orderBurger(newOrderIngredients.map((item) => item._id)))
			.unwrap()
			.catch((e) => console.error(e))
			.finally(() => dispatch(orderActions.setOrderRequest(false)));

		if (!isUserLoggedIn) {
			return (
				<Navigate
					to='/login'
					state={{
						from: {
							...location,
							background: location.state?.background,
							state: null
						}
					}}
				/>
			);
		}
	};

	const closeOrderModal = () => {
		navigate(-1);
	};

	const price = useMemo(
		() =>
			(constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
			constructorItems.ingredients.reduce(
				(s: number, v: TConstructorIngredient) => s + v.price,
				0
			),
		[constructorItems]
	);

	return (
		<BurgerConstructorUI
			price={price}
			orderRequest={orderRequest}
			constructorItems={constructorItems}
			orderModalData={orderModalData ?? null}
			onOrderClick={onOrderClick}
			closeOrderModal={closeOrderModal}
		/>
	);
};
