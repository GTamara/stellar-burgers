import * as api from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
	TAuthResponse,
	TLoginData,
	TRegisterData,
	TServerResponse,
	TUserResponse
} from '../../utils/data-contracts';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface AuthState {
	isAuthChecked: boolean;
	isLoading: boolean;
	user: TUser | null;
	error: string | null;
}

export const initialState: AuthState = {
	isAuthChecked: false,
	isLoading: false,
	user: null,
	error: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		isAuthChecked: (state) => {
			state.isAuthChecked = true;
		}
	},
	selectors: {
		isLoadingSelector: (state) => state.isLoading,
		isAuthCheckedSelector: (state) => state.isAuthChecked,
		userSelector: (state) => state.user,
		errorSelector: (state) => state.error
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка регистрации. ${action.error.message}`;
			})
			.addCase(
				register.fulfilled,
				(state, action: PayloadAction<TAuthResponse>) => {
					state.isLoading = false;
					state.user = action.payload.user;
					state.error = null;
				}
			);

		builder
			.addCase(login.pending, (state) => {
				state.isAuthChecked = false;
				state.isLoading = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.isAuthChecked = true;
				state.isLoading = false;
				state.error = `Ошибка авторизации. ${action.error.message}`;
			})
			.addCase(
				login.fulfilled,
				(state, action: PayloadAction<TAuthResponse>) => {
					state.isAuthChecked = true;
					state.isLoading = false;
					state.user = action.payload.user;
				}
			);

		builder
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка. ${action.error.message}`;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
			});

		builder
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка. ${action.error.message}`;
			})
			.addCase(
				updateUser.fulfilled,
				(state, action: PayloadAction<TUserResponse>) => {
					state.isLoading = false;
					state.user = action.payload.user;
				}
			);

		builder
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = `Ошибка. ${action.error.message}`;
			})
			.addCase(
				getUser.fulfilled,
				(state, action: PayloadAction<TUserResponse>) => {
					state.isLoading = false;
					state.user = action.payload.user;
				}
			);
	}
});

export const register = createAsyncThunk<TAuthResponse, TRegisterData>(
	'auth/register',
	async (data: TRegisterData) =>
		api.registerUserApi(data).then((resp: TAuthResponse) => {
			setCookie('accessToken', resp.accessToken);
			setCookie('refreshToken', resp.refreshToken);
			return resp;
		})
);

export const login = createAsyncThunk<TAuthResponse, TLoginData>(
	'auth/login',
	async (data: TLoginData) =>
		api.loginUserApi(data).then((resp: TAuthResponse) => {
			setCookie('accessToken', resp.accessToken);
			setCookie('refreshToken', resp.refreshToken);
			return resp;
		})
);

export const logout = createAsyncThunk<TServerResponse<{}>>(
	'auth/logout',
	async () =>
		api.logoutApi().then((resp: TServerResponse<{}>) => {
			deleteCookie('accessToken');
			deleteCookie('refreshToken');
			return resp;
		})
);

export const getUser = createAsyncThunk<TUserResponse>(
	'auth/getUser',
	api.getUserApi
);

export const updateUser = createAsyncThunk<
	TUserResponse,
	Partial<TRegisterData>
>('auth/updateUser', async (data: Partial<TRegisterData>) =>
	api.updateUserApi(data)
);

export const authActions = authSlice.actions;

export default authSlice.reducer;
export const authSelectors = authSlice.selectors;
