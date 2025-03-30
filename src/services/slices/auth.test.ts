import {
	authActions,
	authSlice,
	register,
	initialState as INITIAL_STATE,
	login,
	logout,
	getUser
} from './auth.slice';
import * as authTestData from '../../test-data/auth-data';
import { TLoginData, TRegisterData } from 'src/utils/data-contracts';
import exp from 'node:constants';

describe('isAuthChecked ->', () => {
	it('If auth/isAuthChecked is dispatched then isAuthChecked = true', () => {
		const initialState = {
			...INITIAL_STATE,
			isAuthChecked: false
		};
		const newState = authSlice.reducer(
			initialState,
			authActions.isAuthChecked()
		);
		expect(newState.isAuthChecked).toBe(true);
	});
});

describe('auth/register ->', () => {
	it('If auth/register/pending is dispatched then isLoading = true', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: false
		};

		const action = register.pending('', {} as TRegisterData);
		const newState = authSlice.reducer(initialState, action);
		expect(newState.isLoading).toBe(true);
	});

	it('If auth/register/fulfilled is dispatched then isLoading = false', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = register.fulfilled(
			authTestData.AUTH_RESPONSE,
			'',
			authTestData.REGISTER_DATA
		);
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: false,
			user: {
				name: authTestData.AUTH_RESPONSE.user.name,
				email: authTestData.AUTH_RESPONSE.user.email
			}
		});
	});

	it('If auth/register/rejected is dispatched then isLoading = false', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = register.rejected(
			new Error('error'),
			'',
			{} as TRegisterData
		);
		const newState = authSlice.reducer(initialState, action);
		expect(newState.isLoading).toBe(false);
		expect(newState.error).toContain('error');
	});
});

describe('auth/login ->', () => {
	it('If auth/login/pending is dispatched then isLoading = true', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: false
		};

		const action = login.pending('', {} as TLoginData);
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: true
		});
	});

	it('If auth/login/fulfilled is dispatched then isLoading = false', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = login.fulfilled(
			authTestData.AUTH_RESPONSE,
			'',
			authTestData.LOGIN_DATA
		);
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: false,
			isAuthChecked: true,
			user: {
				name: authTestData.AUTH_RESPONSE.user.name,
				email: authTestData.AUTH_RESPONSE.user.email
			}
		});
	});

	it('If auth/login/rejected is dispatched then isLoading = false', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = login.rejected(new Error('error'), '', {} as TLoginData);
		const newState = authSlice.reducer(initialState, action);
		expect(newState.isLoading).toBe(false);
		expect(newState.error).toContain('error');
	});
});

describe('auth/logout ->', () => {
	it('If auth/logout/pending is dispatched then isLoading = true', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = logout.pending('');
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: true
		});
	});

	it(`If auth/logout/fulfilled is dispatched then 
		isLoading = false & respons data is stored in "user" state field`, () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true,
			user: authTestData.USER_DATA
		};
		const action = logout.fulfilled(authTestData.LOGOUT_RESPONSE, '');
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: false,
			user: null
		});
	});

	it('If auth/logout/rejected is dispatched then isLoading = false', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = logout.rejected(new Error('error'), '');
		const newState = authSlice.reducer(initialState, action);
		expect(newState.isLoading).toBe(false);
		expect(newState.error).toContain('error');
	});
});

describe('auth/getUser ->', () => {
	it('If auth/getUser/pending is dispatched then isLoading = true', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = getUser.pending('');
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: true
		});
	});

	it(`If auth/getUser/fulfilled is dispatched then 
		isLoading = false & respons data is stored in "user" state field`, () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = getUser.fulfilled(authTestData.GET_USER_RESPONSE, '');
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: false,
			user: authTestData.GET_USER_RESPONSE.user
		});
	});

	it('If auth/getUser/rejected is dispatched then isLoading = false', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = getUser.rejected(new Error('error'), '');
		const newState = authSlice.reducer(initialState, action);
		expect(newState.isLoading).toBe(false);
		expect(newState.error).toContain('error');
	});
});

fdescribe('auth/updateUser ->', () => {
	it('If auth/updateUser/pending is dispatched then isLoading = true', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = getUser.pending('');
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: true
		});
	});

	it(`If auth/updateUser/fulfilled is dispatched then 
		isLoading = false & respons data is stored in "user" state field`, () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = getUser.fulfilled(authTestData.GET_USER_RESPONSE, '');
		const newState = authSlice.reducer(initialState, action);
		expect(newState).toEqual({
			...INITIAL_STATE,
			isLoading: false,
			user: authTestData.GET_USER_RESPONSE.user
		});
	});

	it('If auth/updateUser/rejected is dispatched then isLoading = false', () => {
		const initialState = {
			...INITIAL_STATE,
			isLoading: true
		};
		const action = getUser.rejected(new Error('error'), '');
		const newState = authSlice.reducer(initialState, action);
		expect(newState.isLoading).toBe(false);
		expect(newState.error).toContain('error');
	});
});
