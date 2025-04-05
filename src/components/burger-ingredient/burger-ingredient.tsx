import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import { burgerConstructorActions } from '../../services/slices/burger-constructor.slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
	({ ingredient, count }) => {
		const location = useLocation();
		const dispatch = useAppDispatch();

		const handleAdd = () => {
			dispatch(
				burgerConstructorActions.addNewOrderIngredient({
					...ingredient,
					id: uuidv4()
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
