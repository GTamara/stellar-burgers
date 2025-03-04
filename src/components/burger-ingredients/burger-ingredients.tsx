import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { EIngredientType, TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
// import { constructorSlice } from '../../services/slices/constructor';
// import { useAppSelector } from 'src/services/store.ts';
import {
	RootState,
	useAppSelector,
	useAppDispatch,
	AppDispatch
} from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	constructorSlice,
	getIngredients
} from '../../services/slices/burger-constructor';

export const BurgerIngredients: FC = () => {
	const ingredientsByType = useAppSelector(
		(state: RootState) => state[constructorSlice.name].ingredientsByType
	);

	const [currentTab, setCurrentTab] = useState<TTabMode>(EIngredientType.bun);
	const titleBunRef = useRef<HTMLHeadingElement>(null);
	const titleMainRef = useRef<HTMLHeadingElement>(null);
	const titleSaucesRef = useRef<HTMLHeadingElement>(null);

	const [bunsRef, inViewBuns] = useInView({
		threshold: 0
	});

	const [mainsRef, inViewFilling] = useInView({
		threshold: 0
	});

	const [saucesRef, inViewSauces] = useInView({
		threshold: 0
	});

	const dispatch: AppDispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	useEffect(() => {
		if (inViewBuns) {
			setCurrentTab('bun');
		} else if (inViewSauces) {
			setCurrentTab('sauce');
		} else if (inViewFilling) {
			setCurrentTab('main');
		}
	}, [inViewBuns, inViewFilling, inViewSauces]);

	const onTabClick = (tab: string) => {
		setCurrentTab(tab as TTabMode);
		if (tab === 'bun')
			titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
		if (tab === 'main')
			titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
		if (tab === 'sauce')
			titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<BurgerIngredientsUI
			currentTab={currentTab}
			buns={ingredientsByType?.bun ?? []}
			mains={ingredientsByType?.main ?? []}
			sauces={ingredientsByType?.sauce ?? []}
			titleBunRef={titleBunRef}
			titleMainRef={titleMainRef}
			titleSaucesRef={titleSaucesRef}
			bunsRef={bunsRef}
			mainsRef={mainsRef}
			saucesRef={saucesRef}
			onTabClick={onTabClick}
		/>
	);
};
