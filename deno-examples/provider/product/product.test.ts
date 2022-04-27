import { opine, json, superdeno } from "../deps.ts";
import { router } from "./product.routes.ts";

Deno.test("Returns all products", async () => {
  const expectedProducts = [
    {
      id: "09",
      type: "CREDIT_CARD",
      name: "Gem Visa",
      version: "v1"
    },
    {
      id: "10",
      type: "CREDIT_CARD",
      name: "28 Degrees",
      version: "v1"
    },
    {
      id: "11",
      type: "PERSONAL_LOAN",
      name: "MyFlexiPay",
      version: "v2"
    }
  ];
  const app = opine();
  app.use(json());
  app.use(router);

  await superdeno(app)
    .get("/products")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect(expectedProducts);
});

Deno.test("Returns product by id", async () => {
  const expectedProduct = {
    id: "09",
    type: "CREDIT_CARD",
    name: "Gem Visa",
    version: "v1"
  };
  const app = opine();
  app.use(json());
  app.use(router);

  await superdeno(app)
    .get("/product/9")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect(expectedProduct);
});
