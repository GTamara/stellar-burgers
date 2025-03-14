import { TUser } from '@utils-types';

export type TServerResponse<T> = {
	success: boolean;
} & T;

export type TOrder = {
	_id: string;
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	ingredients: string[];
};

export type TFeedsResponse = TServerResponse<{
	orders: TOrder[];
	total: number;
	totalToday: number;
}>;

export type TFeeds = Omit<TFeedsResponse, 'success'>;

export type TUserResponse = TServerResponse<{ user: TUser }>;

export type TNewOrderResponse = TServerResponse<{
	order: TOrder;
	name: string;
}>;

export type TOrderResponse = TServerResponse<{
	orders: TOrder[];
}>;

export type TRegisterData = {
	email: string;
	name: string;
	password: string;
};

export type TAuthResponse = TServerResponse<{
	refreshToken: string;
	accessToken: string;
	user: TUser;
}>;

export type TLoginData = {
	email: string;
	password: string;
};
