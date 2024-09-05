import { t } from "elysia";

export const patchDefinition = t.Object({
	key: t.String(),
	value: t.Any(),
});
