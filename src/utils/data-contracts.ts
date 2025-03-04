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
