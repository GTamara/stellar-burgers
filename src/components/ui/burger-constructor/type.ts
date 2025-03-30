import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TOrder } from 'src/utils/data-contracts';

export type BurgerConstructorUIProps = {
	constructorItems: {
		bun: TConstructorIngredient | null;
		ingredients: TConstructorIngredient[];
	};
	orderRequest: boolean;
	price: number;
	orderModalData:
		| (Omit<TOrder, 'ingredients'> & {
				ingredients: TIngredient[];
		  })
		| null;
	onOrderClick: () => void;
	closeOrderModal: () => void;
};
