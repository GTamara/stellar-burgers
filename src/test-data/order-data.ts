import { OrderState } from 'src/services/slices/order.slice';
import { TNewOrderResponse } from 'src/utils/data-contracts';

const INITIAL_STATE: OrderState = {
	isLoading: false,
	error: null,
	orderRequest: false,
	orderModalData: null,
	currentViewedOrderData: null,
	userOrders: []
};

const ORDER_BURGER_RESPONSE: TNewOrderResponse = {
	success: true,
	name: 'Флюоресцентный люминесцентный бургер',
	order: {
		ingredients: [
			{
				_id: '643d69a5c3f7b9001cfa093d',
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
					'https://code.s3.yandex.net/react/code/bun-01-large.png'
			},
			{
				_id: '643d69a5c3f7b9001cfa093d',
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
					'https://code.s3.yandex.net/react/code/bun-01-large.png'
			},
			{
				_id: '643d69a5c3f7b9001cfa093e',
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
					'https://code.s3.yandex.net/react/code/meat-03-large.png'
			}
		],
		_id: '67e7ef47ea327c001cf30b1d',
		owner: {
			name: 'Тамара',
			email: 'goodluck.tamara@yandex.ru',
			createdAt: '2025-03-08T13:54:31.506Z',
			updatedAt: '2025-03-13T16:53:48.101Z'
		},
		status: 'done',
		name: 'Флюоресцентный люминесцентный бургер',
		createdAt: '2025-03-29T13:01:59.378Z',
		updatedAt: '2025-03-29T13:02:00.126Z',
		number: 72554,
		price: 2964
	}
} as TNewOrderResponse;

const GET_ORDER_BY_NUMBER_RESPONSE = {
	success: true,
	orders: [
		{
			_id: '67e81309ea327c001cf30bcc',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa0947',
				'643d69a5c3f7b9001cfa0949'
			],
			owner: '67e43cb66fce7d001db5c798',
			status: 'done',
			name: 'Краторный экзо-плантаго фалленианский бургер',
			createdAt: '2025-03-29T15:34:33.803Z',
			updatedAt: '2025-03-29T15:34:34.456Z',
			number: 72598
		}
	]
};

const GET_ORDERS_DATA = [
	{
		_id: '67cdb172133acd001be56a14',
		ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
		status: 'done',
		name: 'Флюоресцентный био-марсианский бургер',
		createdAt: '2025-03-09T15:19:14.901Z',
		updatedAt: '2025-03-09T15:19:15.637Z',
		number: 70440
	},
	{
		_id: '67cdb345133acd001be56a19',
		ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
		status: 'done',
		name: 'Флюоресцентный люминесцентный бургер',
		createdAt: '2025-03-09T15:27:01.638Z',
		updatedAt: '2025-03-09T15:27:02.292Z',
		number: 70443
	}
];

export {
	INITIAL_STATE,
	ORDER_BURGER_RESPONSE,
	GET_ORDER_BY_NUMBER_RESPONSE,
	GET_ORDERS_DATA
};
