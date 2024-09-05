import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import ApiUtils from "@utils/Api.utils";
import { cors } from "@elysiajs/cors";
import routes from "@http/routes";
import application from '@configs/application';

application.init().then(() => {
  const app = new Elysia()
    .use(cors())
    .use(swagger({ path: "/docs" }))
    .onError(ApiUtils.onError)
    .use(routes)
    .listen(process.env.PORT || 3011);
  
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});
