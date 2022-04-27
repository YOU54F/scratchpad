import { opine, json } from "./deps_server.ts";
import { router } from "./backend/cars.routes.ts";

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
