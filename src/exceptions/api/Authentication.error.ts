import ApiError from "@exceptions/api/Api.error";

export default class AuthenticationError extends ApiError {
	constructor(
		message: string,
		readonly code = 401,
	) {
		super(message, code);
	}
}
