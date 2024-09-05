import ApiError from "@exceptions/api/Api.error";

export default class ServiceError extends ApiError {
	constructor(
		message: string,
		readonly code = 400,
	) {
		super(message, code);
	}
}
