import {
  Application,
  RouteParams,
  Router
} from "https://deno.land/x/oak/mod.ts";
import * as log from "https://deno.land/std@0.92.0/log/mod.ts";

interface Book {
  id: string;
  title: string;
  author: string;
}
type BookId = string;

const books = new Map<BookId, Book>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur"
});

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/books", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/books/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

const PORT = 8000;
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", (evt) => {
  const { port } = evt;
  const hostname = "http://localhost";
  const baseUrl = [hostname, port].join(":");
  log.info("API listening at: " + baseUrl);
  logRoutes(router, baseUrl);
});
await app.listen({ port: PORT });

function logRoutes(
  router: Router<RouteParams, Record<string, string>>,
  baseUrl: string
) {
  for (const route of router.values()) {
    const methods = route.methods.filter((x) => x !== "HEAD").toString();
    const fullRoutePath = baseUrl + route.path;
    log.info(`Generated route: ${methods} : ${fullRoutePath}`);
  }
}
