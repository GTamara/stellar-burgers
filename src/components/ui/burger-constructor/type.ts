import { TOrder } from 'src/utils/data-contracts';

export type BurgerConstructorUIProps = {
	constructorItems: any;
	orderRequest: boolean;
	price: number;
	orderModalData: TOrder | null;
	onOrderClick: () => void;
	closeOrderModal: () => void;
};
