import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
	dialect: "mysql",
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	storage: ':memory:',
	timezone: process.env.DB_TZ,
	define: {
		freezeTableName: true
	},
	models: [import.meta.dir + '/../models'], // or [Player, Team],
});

export default sequelize;
