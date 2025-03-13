import * as api from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
	TAuthResponse,
	TLoginData,
	TRegisterData,
	TServerResponse,
	TUserResponse
} from 'src/utils/data-contracts';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface AuthState {
	isAuthChecked: boolean;
	isLoading: boolean;
	user: TUser | null;
	error: string | null;
	authData: TAuthResponse | null;
}

const initialState: AuthState = {
	isAuthChecked: false,
	isLoading: false,
	user: null,
	error: null,
	authData: null
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
		errorSelector: (state) => state.error,
		authDataSelector: (state) => state.authData
	},
	extraReducers: (builder) => {
		builder.addCase(register.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.isLoading = false;
			state.error = `Ошибка регистрации. ${action.error.message}`;
		});
		builder.addCase(
			register.fulfilled,
			(state, action: PayloadAction<TAuthResponse>) => {
				state.isLoading = false;
				state.authData = action.payload;
				state.user = action.payload.user;
			}
		);

		builder.addCase(login.pending, (state) => {
			state.isAuthChecked = false;
			state.isLoading = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isAuthChecked = true;
			state.isLoading = false;
			state.error = `Ошибка авторизации. ${action.error.message}`;
		});
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<TAuthResponse>) => {
				state.isAuthChecked = true;
				state.isLoading = false;
				state.authData = action.payload;
				state.user = action.payload.user;
			}
		);

		builder.addCase(logout.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(logout.rejected, (state, action) => {
			state.isLoading = false;
			state.error = `Ошибка. ${action.error.message}`;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoading = false;
			state.authData = null;
			state.user = null;
		});

		builder.addCase(updateUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = `Ошибка. ${action.error.message}`;
		});
		builder.addCase(
			updateUser.fulfilled,
			(state, action: PayloadAction<TUserResponse>) => {
				state.isLoading = false;
				state.authData = null;
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
