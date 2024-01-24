import { Context, Elysia } from 'elysia';
import authenticatedRoutes from '@routes/v1/auth';
import publicRoutes from '@routes/v1/public';

export default new Elysia({ prefix: '/v1' }).use(authenticatedRoutes).use(publicRoutes);
