// Exception for API expected errors
export default class ApiError extends Error {
	constructor(
		message: string,
		readonly code = 400,
	) {
		super(message);

		this.name = this.constructor.name;

		// Captura o stack trace
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = new Error(message).stack;
		}
	}
}
