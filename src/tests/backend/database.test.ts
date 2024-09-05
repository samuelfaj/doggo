import { afterAll, beforeAll, expect, test } from 'bun:test';
import { QueryTypes } from 'sequelize';
import application from '@configs/application';
import sequelize from '@configs/sequelize';

// Conecte ao MongoDB (ajuste a string de conexão conforme necessário)
beforeAll(async () => {
	await application.init();
});

test('Can Connect with Database', async () => {
	const rows = await sequelize.query(`SHOW TABLES`, {
		type: QueryTypes.SELECT,
	});
	expect(rows.length).toBeGreaterThan(0);
});
