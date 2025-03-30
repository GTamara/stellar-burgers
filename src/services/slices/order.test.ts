import * as orderTestData from '../../test-data/order-data';
import {
	getOrderByNumber,
	getOrders,
	orderBurger,
	orderSlice,
	orderActions
} from './order.slice';

describe('order slice', () => {
	describe('order burger', () => {
		it('order/orderBurger/pending is dispatched. Then isLoading = true  & error = null', () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				error: new Error('error')
			};
			const newState = orderSlice.reducer(
				initialState,
				orderBurger.pending('', [''])
			);
			expect(newState).toEqual({
				...initialState,
				isLoading: true,
				error: null
			});
		});

		it(`order/orderBurger/fulfilled is dispatched. Then 
			isLoading = false & error = null 
			& order response data is stored in "orderModalData" state field`, () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				isLoading: true
			};
			const action = orderBurger.fulfilled(
				orderTestData.ORDER_BURGER_RESPONSE,
				'',
				[]
			);
			const newState = orderSlice.reducer(initialState, action);
			expect(newState).toEqual({
				...initialState,
				isLoading: false,
				orderModalData: orderTestData.ORDER_BURGER_RESPONSE
			});
		});

		it(`order/orderBurger/rejected is dispatched. Then 
			isLoading = false & error`, () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				isLoading: true
			};
			const action = orderBurger.rejected(new Error('error'), '', []);
			const newState = orderSlice.reducer(initialState, action);
			expect(newState.isLoading).toBe(false);
			expect(newState.error).toContain('error');
		});
	});

	describe('get order by number', () => {
		it('order/getOrderByNumber/pending is dispatched. Then isLoading = true  & error = null', () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				error: new Error('error')
			};
			const newState = orderSlice.reducer(
				initialState,
				getOrderByNumber.pending('', 0)
			);
			expect(newState).toEqual({
				...initialState,
				isLoading: true,
				error: null
			});
		});

		it(`order/getOrderByNumber/fulfilled is dispatched. Then 
			isLoading = false & error = null 
			& order response data is stored in "currentViewedOrderData" state field`, () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				isLoading: true
			};
			const action = getOrderByNumber.fulfilled(
				orderTestData.GET_ORDER_BY_NUMBER_RESPONSE,
				'',
				0
			);
			const newState = orderSlice.reducer(initialState, action);
			expect(newState).toEqual({
				...initialState,
				isLoading: false,
				currentViewedOrderData:
					orderTestData.GET_ORDER_BY_NUMBER_RESPONSE
			});
		});

		it(`order/getOrderByNumber/rejected is dispatched. Then 
			isLoading = false & error`, () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				isLoading: true,
				error: null
			};
			const action = getOrderByNumber.rejected(new Error('error'), '', 0);
			const newState = orderSlice.reducer(initialState, action);
			expect(newState.isLoading).toBe(false);
			expect(newState.error).toContain('error');
		});
	});

	describe('get all orders for authorized user', () => {
		it('order/getOrders/pending is dispatched. Then isLoading = true  & error = null', () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				error: new Error('error')
			};
			const newState = orderSlice.reducer(
				initialState,
				getOrders.pending('')
			);
			expect(newState).toEqual({
				...initialState,
				isLoading: true,
				error: null
			});
		});

		it(`order/getOrders/fulfilled is dispatched. Then isLoading = false
			& error = null
			& response data is stored in "userOrders" state field`, () => {
			const initialState = {
				...orderTestData.INITIAL_STATE,
				isLoading: true
			};
			const action = getOrders.fulfilled(
				orderTestData.GET_ORDERS_DATA,
				''
			);
			const newState = orderSlice.reducer(initialState, action);
			expect(newState).toEqual({
				...initialState,
				isLoading: false,
				userOrders: orderTestData.GET_ORDERS_DATA,
				error: null
			});
		});
	});

	describe('setOrderRequest', () => {
		it.each([
			[true, true],
			[false, false]
		])(
			'order/setOrderRequest is dispatched. If request payload = %s then result = %s',
			(orderRequest) => {
				const initialState = {
					...orderTestData.INITIAL_STATE,
					orderRequest: !orderRequest
				};
				const action = orderActions.setOrderRequest(orderRequest);
				const newState = orderSlice.reducer(initialState, action);
				expect(newState.orderRequest).toBe(orderRequest);
			}
		);
	});
});
