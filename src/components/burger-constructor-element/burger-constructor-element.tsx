import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/store';
import { burgerConstructorActions } from '../../services/slices/burger-constructor.slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
	({ ingredient, index, totalItems }) => {
		const dispatch = useAppDispatch();

		const handleMoveDown = () => {};

		const handleMoveUp = () => {
			console.log('handleMoveUp');
		};

		const handleClose = () => {
			dispatch(
				burgerConstructorActions.removeNewOrderIngredient(ingredient)
			);
		};

		return (
			<BurgerConstructorElementUI
				ingredient={ingredient}
				index={index}
				totalItems={totalItems}
				handleMoveUp={handleMoveUp}
				handleMoveDown={handleMoveDown}
				handleClose={handleClose}
			/>
		);
	}
);
