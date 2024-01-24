import ApiError from '@exceptions/api/Api.error';

export default class NotFoundError extends ApiError {
	constructor(
		message: string,
		readonly code = 404,
	) {
		super(message, code);
	}
}
