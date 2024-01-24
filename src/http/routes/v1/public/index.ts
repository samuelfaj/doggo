import { Elysia } from 'elysia';
import IndexController from '@controllers/Index.controller';

const app = new Elysia({ prefix: '/public' })
	.get('test1', IndexController.index);

export default app;
