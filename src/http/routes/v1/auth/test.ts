import { Elysia } from 'elysia';
import IndexController from '@controllers/Index.controller';
import { userAuthMiddleware } from '@middlewares/userAuth.middleware';
import userPermissions from '@definitions/consts/userPermissions.const';

const app = new Elysia();

app.get('/test', IndexController.indexLoggedIn, {
	beforeHandle: userAuthMiddleware({
		permission: userPermissions.MASTER.name,
	}),
});

export default app;
