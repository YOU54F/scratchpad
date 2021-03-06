import { createDevSocket } from "./devsocket.js";
import { createPageRoutes } from "./pages.js";
import { createStaticRoutes } from "./static.js";

const createRoutes = async () => [
  ...createDevSocket(),
  ...(await createPageRoutes()),
  ...(await createStaticRoutes())
];

export default createRoutes;
