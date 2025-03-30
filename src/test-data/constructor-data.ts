import {
	EIngredientType,
	TConstructorIngredient,
	TIngredient
} from '@utils-types';
import { ConstructorState } from 'src/services/slices/burger-constructor.slice';

const INITIAL_STATE: ConstructorState = {
	isLoading: false,
	error: null,
	currentTab: EIngredientType.bun,
	allIngredients: [],
	burgerConstructor: {
		bun: {
			_id: '_id_1',
			name: 'Флюоресцентная булка R2-D3',
			type: 'bun',
			proteins: 44,
			fat: 26,
			carbohydrates: 85,
			calories: 643,
			price: 988,
			image: 'https://code.s3.yandex.net/react/code/bun-01.png',
			image_mobile:
				'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
			image_large:
				'https://code.s3.yandex.net/react/code/bun-01-large.png',
			id: 'id_1'
		},
		ingredients: [
			{
				_id: '_id_2',
				name: 'Филе Люминесцентного тетраодонтимформа',
				type: 'main',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/meat-03.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
				image_large:
					'https://code.s3.yandex.net/react/code/meat-03-large.png',
				id: 'id_2'
			},
			{
				_id: '_id_3',
				name: 'Биокотлета из марсианской Магнолии',
				type: 'main',
				proteins: 420,
				fat: 142,
				carbohydrates: 242,
				calories: 4242,
				price: 424,
				image: 'https://code.s3.yandex.net/react/code/meat-01.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
				image_large:
					'https://code.s3.yandex.net/react/code/meat-01-large.png',
				id: 'id_3'
			}
		]
	}
};

const NEW_BUN_INGREDIENT: TConstructorIngredient = {
	_id: '_id_10',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	id: 'id_10'
};

const NEW_SAUCE_INGREDIENT: TConstructorIngredient = {
	_id: '_id_11',
	name: 'Соус Spicy-X',
	type: 'sauce',
	proteins: 30,
	fat: 20,
	carbohydrates: 40,
	calories: 30,
	price: 90,
	image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
	id: 'id_11'
};

const NEW_MAIN_INGREDIENT: TConstructorIngredient = {
	_id: '_id_12',
	name: 'Соус фирменный Space Sauce',
	type: 'sauce',
	proteins: 50,
	fat: 22,
	carbohydrates: 11,
	calories: 14,
	price: 80,
	image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
	id: 'id_12'
};

const GET_INGREDIENTS_DATA: TIngredient[] = [
	{
		_id: '643d69a5c3f7b9001cfa093c',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
	},
	{
		_id: '643d69a5c3f7b9001cfa0941',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
		calories: 4242,
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_mobile:
			'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
	}
];

export {
	INITIAL_STATE,
	NEW_BUN_INGREDIENT,
	NEW_SAUCE_INGREDIENT,
	NEW_MAIN_INGREDIENT,
	GET_INGREDIENTS_DATA
};
