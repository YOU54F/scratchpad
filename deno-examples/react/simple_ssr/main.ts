import { serve } from "https://deno.land/std@0.92.0/http/server.ts";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@16.13.1/server";
import Home from "./pages/Home.jsx";

function render(jsx: JSX.Element) {
  return ReactDOMServer.renderToString(jsx);
}

const server = serve({ port: 8000 });
const headers = new Headers();
headers.append("Content-Type", "text/html; charset=UTF-8");

for await (const req of server) {
  req.respond({
    status: 200,
    headers: headers,
    body: render(Home())
  });
}
