import { Sequelize } from "sequelize-typescript";
import models from "@models/sequelize/index";

const sequelize = new Sequelize({
	dialect: "mysql",
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	storage: ":memory:",
	timezone: process.env.DB_TZ || "-07:00",
	define: {
		freezeTableName: false,
		timestamps: false,
	},
	logging: process.env.DB_LOGGING || false,
	models: Object.values(models),
});

export default sequelize;
