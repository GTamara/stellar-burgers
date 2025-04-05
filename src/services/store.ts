import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
	TypedUseSelectorHook,
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector
} from 'react-redux';
import { createAsyncThunk as createReduxAsyncThunk } from '@reduxjs/toolkit';
import { constructorSlice } from './slices/burger-constructor.slice';
import { orderSlice } from './slices/order.slice';
import { feedSlice } from './slices/feed.slice';
import { authSlice } from './slices/auth.slice';

export const rootReducer = combineSlices(
	constructorSlice,
	orderSlice,
	feedSlice,
	authSlice
);

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production'
	// middleware: getDefaultMiddleware =>
	// 	getDefaultMiddleware({
	// 		thunk: {
	// 			extraArgument: BurgerApi,
	// 		},
	// 	}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const createAppAsyncThunk = createReduxAsyncThunk.withTypes<{
	state: RootState;
	dispatch: AppDispatch;
	// extra: typeof BurgerApi;
}>();

export default store;
