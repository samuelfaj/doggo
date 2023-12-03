import { Elysia } from "elysia";

import sequelize from "@configs/sequelize";
console.log('Sequelize initialized', sequelize.options.host);

const app = new Elysia()
	.use(import('./http/routes/index'))
	.listen(process.env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
