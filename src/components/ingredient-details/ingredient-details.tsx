import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { findIngredientByIdSelector } from '../../services/selectors/burger-constructor';

export const IngredientDetails: FC = () => {
	const ingredientId = useParams().id;
	/** TODO: взять переменную из стора */

	const ingredientData = useAppSelector((state) =>
		findIngredientByIdSelector(state, ingredientId)
	);
	if (!ingredientData) {
		return <Preloader />;
	}

	return <IngredientDetailsUI ingredientData={ingredientData} />;
};
