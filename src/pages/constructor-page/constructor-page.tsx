import { RootState, useAppSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import {
	constructorSlice,
	selectIsLoading
} from '../../services/slices/burger-constructor';
import { useSelector } from 'react-redux';

export const ConstructorPage: FC = () => {
	console.log('ConstructorPage render');
	/** TODO: взять переменную из стора */
	// const isIngredientsLoading: boolean = useSelector((state: RootState) => state['burger-constructor'].isLoading);
	const isIngredientsLoading: boolean = false; // useSelector(selectIsLoading);

	return (
		<>
			{isIngredientsLoading ? (
				<Preloader />
			) : (
				<main className={styles.containerMain}>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
					>
						Соберите бургер
					</h1>
					<div className={`${styles.main} pl-5 pr-5`}>
						<BurgerIngredients />
						<BurgerConstructor />
					</div>
				</main>
			)}
		</>
	);
};
