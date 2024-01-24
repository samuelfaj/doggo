import ServiceAbstract from '@abstracts/services/Service.abstract';
import {
	type FindOptions,
	type UpdateOptions,
	type CreateOptions,
	type Model,
	type Transaction,
	type DestroyOptions,
} from 'sequelize';
import { type ModelCtor } from 'sequelize-typescript';

export default abstract class CrudServiceAbstract<T extends Model<any, any>> extends ServiceAbstract {
	protected abstract model: ModelCtor<any>;

	async findByPk(id: number, options?: FindOptions): Promise<T | null> {
		return await this.model.findByPk(id, options);
	}

	async findOne(options?: FindOptions): Promise<T | null> {
		return await this.model.findOne(options);
	}

	async search(query?: FindOptions): Promise<{ rows: T[]; count: number }> {
		return await this.model.findAndCountAll(query);
	}

	async create(data: T['_creationAttributes'], options?: CreateOptions): Promise<T> {
		const self = this;

		if (options?.transaction) {
			return await self.model.create(data, options);
		}

		return await this.transaction(async (transaction: Transaction) => {
			return await self.model.create(data, { ...options, transaction });
		});
	}

	async patch(
		model: T,
		key: keyof T['_attributes'],
		value: T['_attributes'][typeof key],
		options?: UpdateOptions,
	): Promise<T> {
		return await this.update(model, { [key]: value } as Partial<T>, options);
	}

	async update(model: T, body: Partial<T['_attributes']>, options?: UpdateOptions): Promise<T> {
		if (options?.transaction) {
			await model.update(body, options);

			return model;
		}

		return await this.transaction(async (transaction: Transaction) => {
			await model.update(body, { ...options, transaction });

			return model;
		});
	}

	async delete(model: T, options?: DestroyOptions): Promise<T> {
		if (options?.transaction) {
			await model.destroy(options);

			return model;
		}

		return await this.transaction(async (transaction: Transaction) => {
			await model.destroy({ ...options, transaction });

			return model;
		});
	}
}
