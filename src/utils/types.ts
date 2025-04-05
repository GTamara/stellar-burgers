import { TOrder } from './data-contracts';

export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
	id: string;
};

export type TOrdersData = {
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export type TUser = {
	email: string;
	name: string;
};

export type TTabMode = keyof typeof EIngredientType; //'bun' | 'sauce' | 'main';

export enum EIngredientType {
	bun = 'bun',
	main = 'main',
	sauce = 'sauce'
}
