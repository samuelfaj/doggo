import AuthenticationError from "@exceptions/api/Authentication.error";
import { type RequestWithUser } from "@definitions/types/api/apiContexts.types";
import AuthService from "@services/Auth.service";

export const userAuthMiddleware = (required = true) => {
	return async (context: any) => {
		const authorization =
			context.request.headers.get("authorization") || "";

		const basicAuth = async () => {
			let username = null;
			let password = null;

			if (authorization) {
				const auth = Buffer.from(
					authorization.split(" ")[1],
					"base64",
				).toString();
				[username, password] = auth.split(":");
			}

			if (username && password) {
				(context.request as any).user =
					await AuthService.authenticateUser(username, password);
			}

			if (required && !(context.request as RequestWithUser).user) {
				throw new AuthenticationError("Invalid email or password");
			}
		};

		if (!(context.request as RequestWithUser).user) {
			if (required && !authorization) {
				throw new AuthenticationError("Invalid email or password");
			}

			if (authorization.toLowerCase().indexOf("basic") > -1) {
				await basicAuth();
			}
		}
	};
};
