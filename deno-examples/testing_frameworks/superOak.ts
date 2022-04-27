import { Application, Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { superoak } from "https://deno.land/x/superoak@4.1.0/mod.ts";

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Hello Deno!";
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

Deno.test("it should support the Oak framework", async () => {
  const request = await superoak(app);
  await request.get("/").expect("Hello Deno!");
});

Deno.test(
  "it will allow you to re-use the Application for another SuperOak instance",
  async () => {
    const request1 = await superoak(app);
    await request1.get("/").expect(200);

    const request2 = await superoak(app);
    await request2.get("/").expect("Hello Deno!");
  }
);
