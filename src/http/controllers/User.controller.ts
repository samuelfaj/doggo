import ApiUtils from "@utils/Api.utils";
import { type Context } from "elysia";
import { type RequestWithUser } from "@definitions/types/api/apiContexts.types";
import UserService from "@services/User.service";
import AuthService from "@services/Auth.service";

export default class UserController {
	static getLoggedInUser(context: Context) {
		const request = context.request as RequestWithUser;
		return ApiUtils.success(request.user);
	}

	static async update(context: Context<{ body: any }>) {
		const request = context.request as RequestWithUser;

		if (context.body.accountPassword) {
			if (
				!(await AuthService.authenticateUser(
					request.user.username,
					context.body.accountPassword,
				))
			) {
				throw new Error("Incorrect password.");
			}
		}

		if (
			context.body.password &&
			context.body.password != context.body.repeatPassword
		) {
			throw new Error("Passwords do not match.");
		}

		return ApiUtils.success(
			await UserService.update(request.user, context.body as any, {
				actionMadeBy: request.user,
			}),
		);
	}
}
