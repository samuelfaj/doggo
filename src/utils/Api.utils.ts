import ApiError from "@exceptions/api/Api.error";
import NotFoundError from "@exceptions/api/NotFound.error";
import {
	type ApiSuccessResponse,
	type ApiDisabledResponse,
	type ApiErrorResponse,
	type ApiRedirectResponse,
} from "@definitions/types/api/apiResponses.types";
import { type Model } from "sequelize-typescript";

import { t } from "elysia";

export default class ApiUtils {
	static onError(args: any) {
		const { code, error, set } = args;

		if (code === "NOT_FOUND") {
			set.status = 404;

			return ApiUtils.error(new NotFoundError(error.message));
		}

		set.status = error.code || 400;

		const result =
			error instanceof Error ? error : new Error(error.message);

		console.log("--------------- ERROR ----------------");
		console.log(result);
		console.log("--------------- ERROR ----------------");

		return ApiUtils.error(result);
	}

	static redirect(url: string, message = "Success"): ApiRedirectResponse {
		return {
			code: 200,
			message,
			error: false,
			return: null,
			redirect_to: url,
		};
	}

	static success(response: any, message = "Success"): ApiSuccessResponse {
		return {
			code: 200,
			message,
			error: false,
			return: response,
			redirect_to: null,
		};
	}

	static disabled(): ApiDisabledResponse {
		return ApiUtils.error(
			new ApiError("This feature is disabled", 403),
		) as ApiDisabledResponse;
	}

	static error(error: Error | ApiError): ApiErrorResponse {
		return {
			code: error instanceof ApiError && error.code ? error.code : 500,
			message: error.message,
			error: {
				type: error.constructor.name || "Error",
				stack: error.stack || null,
			},
			redirect_to: null,
		};
	}

	static modelToBodyDefinition(
		model: typeof Model,
		type = "optional",
		properties: any = {},
	) {
		for (const index in model.rawAttributes) {
			const attributeName = index;

			if (properties[attributeName]) {
				continue;
			}

			const attributeDetails = model.rawAttributes[index];

			const { allowNull, defaultValue, primaryKey } = attributeDetails;

			let elysiaType;
			const key =
				attributeDetails.type && (attributeDetails.type as any).key
					? (attributeDetails.type as any).key
					: null;

			switch (key) {
				case "STRING":
				case "TEXT":
				case "UUID":
					elysiaType = t.String();
					break;
				case "INTEGER":
					elysiaType = t.Number();
					break;
				case "BOOLEAN":
					elysiaType = t.Boolean();
					break;
				case "DATE":
					elysiaType = t.Date();
					break;
				case "JSON":
					elysiaType = t.Object({});
					break;
				case "ARRAY":
					// This assumes an array of strings. Adjust as needed for other types.
					elysiaType = t.Array(t.String());
					break;
				case "ENUM":
					// This is a simplification. You might need to handle enums more specifically.
					elysiaType = t.String();
					break;
				default:
					elysiaType = t.Any();
					break;
			}

			if (!allowNull) {
				elysiaType = t.Required(elysiaType);
			} else {
				elysiaType = t.Optional(elysiaType);
			}

			if (type == "optional") {
				elysiaType = t.Optional(elysiaType);
			}

			properties[attributeName] = elysiaType;
		}

		return t.Object(properties);
	}
}
