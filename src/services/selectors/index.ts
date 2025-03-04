import { EIngredientType, TIngredient } from '@utils-types';

export const specifiedTypeIngredientsSelector = (
	allIngredients: TIngredient[],
	specifiedType: EIngredientType
) => allIngredients.filter((item: TIngredient) => item.type === specifiedType);
