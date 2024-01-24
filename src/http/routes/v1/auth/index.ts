import { Elysia } from 'elysia';
import { userAuthMiddleware } from '@middlewares/userAuth.middleware';
import test from '@routes/v1/auth/test';

const app = new Elysia().group('/auth', (app) =>
	app
		.onBeforeHandle(userAuthMiddleware())
		.use(test)
);

export default app;
