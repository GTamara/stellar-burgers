import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import * as constructorSlice from './slices/burger-constructor.slice';
import * as orderSlice from './slices/order.slice';
import * as feedSlice from './slices/feed.slice';
import * as authSlice from './slices/auth.slice';

let store = configureStore({
	reducer: rootReducer
});

describe('store is initialized correctly', () => {
	test('store is defined', () => {
		expect(store).toBeDefined();
	});

	test('burger-constructor -> getState() returns correct initial state', () => {
		expect(store.getState()['burger-constructor']).toBeDefined();
		expect(
			store.getState()['burger-constructor']
		).toEqual<constructorSlice.ConstructorState>(
			constructorSlice.initialState
		);
	});

	test('order -> getState() returns correct initial state', () => {
		expect(store.getState().order).toBeDefined();
		expect(store.getState().order).toEqual<orderSlice.OrderState>(
			orderSlice.initialState
		);
	});

	test('feed -> getState() returns correct initial state', () => {
		expect(store.getState().feed).toBeDefined();
		expect(store.getState().feed).toEqual<feedSlice.FeedState>(
			feedSlice.initialState
		);
	});

	test('auth -> getState() returns correct initial state', () => {
		expect(store.getState().auth).toBeDefined();
		expect(store.getState().auth).toEqual<authSlice.AuthState>(
			authSlice.initialState
		);
	});
});
