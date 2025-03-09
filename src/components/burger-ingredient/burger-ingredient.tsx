import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import { EIngredientType } from '@utils-types';
import { orderActions } from '../../services/slices/order.slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
	({ ingredient, count }) => {
		const location = useLocation();
		const dispatch = useAppDispatch();

		const handleAdd = () => {
			dispatch(
				orderActions.addNewOrderIngredient({
					...ingredient,
					id: ''
				})
			);
		};
		return (
			<BurgerIngredientUI
				ingredient={ingredient}
				count={count}
				locationState={{ background: location }}
				handleAdd={handleAdd}
			/>
		);
	}
);
