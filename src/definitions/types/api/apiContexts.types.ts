import type User from '@models/User';
import { Context, RouteSchema } from 'elysia';
import { GetPathParameter } from 'elysia/dist/types';
import { type Model } from 'sequelize-typescript';

export type ContextParams = Record<string, number | string>;

export type RequestWithModel = Request & { model: Model };
export type RequestWithUser = Request & { user: User };
