import sequelize from "@configs/sequelize";
console.log(
	"🚀 Sequelize initialized",
	`(${sequelize.options.host} - ${process.env.DB_NAME})`,
);
