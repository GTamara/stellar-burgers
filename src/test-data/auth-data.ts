import { TUser } from '@utils-types';
import { TRegisterData } from 'src/utils/data-contracts';

export const USER_DATA: TUser = {
	email: '2bGZM@example.com',
	name: 'test'
};

export const REGISTER_DATA: TRegisterData = {
	...USER_DATA,
	password: 'password-test'
};

export const LOGIN_DATA = {
	email: '2bGZM@example.com',
	password: 'password-test'
};

export const RESET_PASSWORD_DATA = {
	token: 'token-test',
	password: 'password-test'
};

export const FORGOT_PASSWORD_DATA = {
	email: '2bGZM@example.com'
};

export const UPDATE_USER_DATA = {};

export const AUTH_RESPONSE = {
	refreshToken: 'refreshToken-test',
	accessToken: 'accessToken-test',
	user: USER_DATA,
	success: true
};

export const LOGOUT_RESPONSE = {
	success: true
};

export const GET_USER_RESPONSE = {
	user: USER_DATA,
	success: true
};
