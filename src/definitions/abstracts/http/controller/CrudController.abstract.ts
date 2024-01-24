import { type Context } from 'elysia';
import { type ApiDisabledResponse, type ApiSuccessResponse } from '@definitions/types/api/apiResponses.types';
import { type ContextParams, type RequestWithModel, RequestWithUser } from '@definitions/types/api/apiContexts.types';
import type CrudServiceAbstract from '@abstracts/services/CrudService.abstract';
import ApiUtils from '@utils/Api.utils';
import NotFoundError from '@exceptions/api/NotFound.error';
import { type FindOptions } from 'sequelize';

export default abstract class CrudControllerAbstract {
	protected abstract service: CrudServiceAbstract<any>;

	public async search(context: Context): Promise<ApiSuccessResponse | ApiDisabledResponse | false> {
		const params = context.params as ContextParams;

		return ApiUtils.success(
			this.service.search({
				offset: +params.offset || 0,
				limit: +params.limit || 100,
			}),
		);
	}

	public async findByPk(
		context: Context<{ params: Record<string, string> }>,
		options?: FindOptions,
	): Promise<ApiSuccessResponse | ApiDisabledResponse | false | void> {
		const key = Object.keys(context.params)[0];
		const find = await this.service.findByPk(+context.params[key], options);

		if (!find) throw new NotFoundError('Not found');
		(context.request as RequestWithModel).model = find;
	}

	public async findOne(
		context: Context<{ params: Record<string, string> }>,
		options?: FindOptions,
	): Promise<ApiSuccessResponse | ApiDisabledResponse | false | void> {
		const find = await this.service.findOne(options);

		if (!find) throw new NotFoundError('Not found');
		(context.request as RequestWithModel).model = find;
	}

	public async get(
		context: Context<{ params: Record<string, string> }>,
	): Promise<ApiSuccessResponse | ApiDisabledResponse | false | void> {
		const model = (context.request as RequestWithModel).model;

		return ApiUtils.success(model);
	}

	public async post(
		context: Context<{ params: Record<string, string>; body: any }>,
	): Promise<ApiSuccessResponse | ApiDisabledResponse | false> {
		const model = (context.request as RequestWithModel).model;

		return ApiUtils.success(this.service.create(model, context.body));
	}

	public async patch(
		context: Context<{ params: Record<string, string>; body: Record<string, any> }>,
	): Promise<ApiSuccessResponse | ApiDisabledResponse | false> {
		const model = (context.request as RequestWithModel).model;
		const key = Object.keys(context.params)[0];

		return ApiUtils.success(this.service.patch(model, key, context.body[key]));
	}

	public async update(
		context: Context<{ params: Record<string, string>; body: any }>,
	): Promise<ApiSuccessResponse | ApiDisabledResponse | false> {
		const model = (context.request as RequestWithModel).model;
		const body = context.body as Record<string, any>;

		return ApiUtils.success(this.service.update(model, body));
	}

	public async delete(
		context: Context<{ params: Record<string, string> }>,
	): Promise<ApiSuccessResponse | ApiDisabledResponse | false> {
		const model = (context.request as RequestWithModel).model;

		return ApiUtils.success(this.service.delete(model));
	}
}
