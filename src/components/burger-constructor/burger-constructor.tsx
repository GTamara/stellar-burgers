import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
	orderActions,
	orderBurger,
	orderSelectors
} from '../../services/slices/order.slice';
import {
	Navigate,
	NavigateOptions,
	useLocation,
	useNavigate
} from 'react-router-dom';
import { authSelectors } from '../../services/slices/auth.slice';
import { TOrder } from '../../utils/data-contracts';
import {
	burgerConstructorActions,
	burgerConstructorSelectors
} from '../../services/slices/burger-constructor.slice';
import { v4 as uuidv4 } from 'uuid';

export const BurgerConstructor: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const draggingElement = useAppSelector(
		burgerConstructorSelectors.draggingElementSelector
	);

	const isUserLoggedIn = !!useAppSelector(authSelectors.userSelector);

	/** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
	const newOrderIngredients = useAppSelector(
		burgerConstructorSelectors.burgerConstructorSelector
	);

	const constructorItems: {
		bun: TConstructorIngredient | null;
		ingredients: TConstructorIngredient[];
	} = {
		bun: newOrderIngredients.bun ?? null,
		ingredients: newOrderIngredients.ingredients
	};

	const orderRequest: boolean = useAppSelector(
		orderSelectors.orderRequestSelector
	);

	const orderModalData: TOrder | undefined = useAppSelector(
		orderSelectors.orderModalDataSelector
	)?.order;

	const onOrderClick = () => {
		if (!isUserLoggedIn) {
			navigate('/login', {
				state: {
					from: {
						...location,
						background: location.state?.background,
						state: null
					}
				}
			});
			return false;
		}

		if (!constructorItems.bun || orderRequest) return;

		dispatch(orderActions.setOrderRequest(true));

		dispatch(
			orderBurger(
				[
					newOrderIngredients.bun,
					newOrderIngredients.bun,
					...newOrderIngredients.ingredients
				].map((item) => (item as TConstructorIngredient)._id)
			)
		)
			.unwrap()
			.catch((e) => console.error(e))
			.finally(() => {
				dispatch(orderActions.setOrderRequest(false));
				dispatch(burgerConstructorActions.clearConstructor());
			});
	};

	const closeOrderModal = () => {
		// navigate(-1);
		dispatch(orderActions.clearOrderModalData());
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

	const dropAction = () => {
		dispatch(
			burgerConstructorActions.addNewOrderIngredient(
				draggingElement as TConstructorIngredient
			)
		);
	};

	return (
		<BurgerConstructorUI
			price={price}
			orderRequest={orderRequest}
			constructorItems={constructorItems}
			orderModalData={orderModalData ?? null}
			onOrderClick={onOrderClick}
			closeOrderModal={closeOrderModal}
			dropAction={dropAction}
		/>
	);
};
