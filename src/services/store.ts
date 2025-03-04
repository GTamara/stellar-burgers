import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
	TypedUseSelectorHook,
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector
} from 'react-redux';
import { constructorSlice } from './slices/burger-constructor';
import { orderSlice } from './slices/order';
// import constructorSlice from './slices/burger-constructor';

const rootReducer = combineSlices(constructorSlice, orderSlice); // Заменить на импорт настоящего редьюсера

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
