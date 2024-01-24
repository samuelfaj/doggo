import ApiUtils from '@utils/Api.utils';
import ApiError from '@exceptions/api/Api.error';
import { type Context } from 'elysia';
import { type RequestWithUser } from '@definitions/types/api/apiContexts.types';

export default class IndexController {
	static indexLoggedIn(context: Context) {
		const request = context.request as RequestWithUser;

		return ApiUtils.success(request.user);
	}

	static index(context: Context) {
		return ApiUtils.success('Welcome');
	}

	static error(context: Context) {
		throw new ApiError('This is an expected error');
	}
}
