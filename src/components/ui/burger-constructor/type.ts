import { TConstructorIngredient } from '@utils-types';
import { TOrder } from 'src/utils/data-contracts';

export type BurgerConstructorUIProps = {
	constructorItems: {
		bun: TConstructorIngredient | null;
		ingredients: TConstructorIngredient[];
	};
	orderRequest: boolean;
	price: number;
	orderModalData: TOrder | null;
	onOrderClick: () => void;
	closeOrderModal: () => void;
};
