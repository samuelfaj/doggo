const configuration = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	dialect: "mysql",
};

module.exports = {
	development: {
		...configuration,
	},
	test: {
		...configuration,
	},
	production: {
		...configuration,
	},
};
