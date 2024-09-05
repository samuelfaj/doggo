import ApiError from "@exceptions/api/Api.error";

export default class PermissionError extends ApiError {
	constructor(
		message: string,
		readonly code = 403,
	) {
		super(message, code);
	}
}
