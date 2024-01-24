import AuthenticationError from '@exceptions/api/Authentication.error';
import PermissionError from '@exceptions/api/Permission.error';
import { type RequestWithUser } from '@definitions/types/api/apiContexts.types';

export const userAuthMiddleware = (args?: { permission?: string }) => {
	return async (context: any) => {
		const basic = context.request.headers.get('authorization');

		let email = null;
		let password = null;

		if (basic) {
			const auth = Buffer.from(basic.split(' ')[1], 'base64').toString();

			[email, password] = auth.split(':');
		}

		if (!email || !password) throw new AuthenticationError('Invalid email or password');

		// const request = context.request;
		//
		// const user = request.user
		// 	? request.user
		// 	: await User.findOne({
		// 			// attributes: { exclude: ['passwordHash'] },
		// 			include: [{ model: UserPermission }],
		// 			where: { email, passwordHash: password },
		// 		});
		//
		// if (!user) throw new AuthenticationError('Invalid email or password');
		//
		// if (args?.permission) {
		// 	const hasPermission = user.UserPermissions?.find(
		// 		(permission: UserPermission) => permission.permission === args?.permission,
		// 	);
		//
		// 	if (!hasPermission) {
		// 		throw new PermissionError(
		// 			`Você não tem permissão para acessar este recurso. Permissão Necessária: ${args?.permission}`,
		// 		);
		// 	}
		// }

		(context.request as RequestWithUser).user = {}; //add your user model;
	};
};
