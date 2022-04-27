import { opine, json } from "./deps.ts";
import { router } from "./product/product.routes.ts";

const PORT = 3000;
const app = opine();

const init = () => {
  app.use(json());
  app.use(router);
  return app.listen(PORT, () =>
    console.log(`Provider API listening on port ${PORT}...`)
  );
};

init();
