import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
	Counter,
	CurrencyIcon,
	AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { burgerConstructorActions } from '../../../services/slices/burger-constructor.slice';
import { useAppDispatch } from '../../../services/store';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
	({ ingredient, count, handleAdd, dragEndAction, locationState }) => {
		const { image, price, name, _id } = ingredient;
		const dispatch = useAppDispatch();

		const onDragOver = (e: React.DragEvent<HTMLImageElement>) => {
			e.preventDefault();
			return false;
		};

		const onDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
			e.preventDefault();
			dragEndAction();
			return false;
		};

		const startHandler = (e: React.DragEvent<HTMLImageElement>) => {
			e.dataTransfer.dropEffect = 'none';
			dispatch(
				burgerConstructorActions.setDraggingElement(
					ingredient as TConstructorIngredient
				)
			);
		};

		return (
			<li className={styles.container}>
				<Link
					className={styles.article}
					to={`/ingredients/${_id}`}
					state={locationState}
				>
					{count && <Counter count={count} />}
					<img
						className={styles.img}
						src={image}
						alt='картинка ингредиента.'
						draggable='true'
						onDragStart={startHandler}
						onDragOver={onDragOver}
						onDragEnd={onDragEnd}
					/>
					<div className={`${styles.cost} mt-2 mb-2`}>
						<p className='text text_type_digits-default mr-2'>
							{price}
						</p>
						<CurrencyIcon type='primary' />
					</div>
					<p className={`text text_type_main-default ${styles.text}`}>
						{name}
					</p>
				</Link>
				<AddButton
					text='Добавить'
					onClick={handleAdd}
					extraClass={`${styles.addButton} mt-8`}
				/>
			</li>
		);
	}
);
