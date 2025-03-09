import { authSlice } from '../slices/auth.slice';
import { RootState } from '../store';

export const userSelector = (state: RootState) => state[authSlice.name].user;
