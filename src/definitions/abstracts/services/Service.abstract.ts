import { type Transaction } from 'sequelize';
import Sequelize from '@configs/sequelize';

export default abstract class ServiceAbstract {
	protected async transaction(func: (transaction: Transaction) => Promise<any>) {
		const transaction = await Sequelize.transaction();

		try {
			const response = await func(transaction);

			await transaction.commit();

			return response;
		} catch (e) {
			await transaction.rollback();
			throw e;
		}
	}
}
