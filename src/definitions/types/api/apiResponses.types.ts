export interface ApiSuccessResponse {
	code: number;
	message: string;
	error: false;
	return: any;
	redirect_to: null;
}

export interface ApiRedirectResponse {
	code: number;
	message: string;
	error: false;
	return: null;
	redirect_to: string;
}

export type ApiDisabledResponse = ApiErrorResponse & {
	code: 403;
};

export interface ApiErrorResponse {
	code: number;
	message: string;
	error: {
		type: string;
		stack: any;
	};
	redirect_to: null;
}
