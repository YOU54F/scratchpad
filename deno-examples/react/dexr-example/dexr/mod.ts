// @deno-types="https://raw.githubusercontent.com/Soremwar/deno_types/4a50660/react/v16.13.1/react.d.ts"
import React from "https://dev.jspm.io/react@16.13.1";
import { Application, Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { join, fromFileUrl } from "https://deno.land/std@0.62.0/path/mod.ts";
import { Renderer, createRenderer } from "./renderer.tsx";
import { getQuery } from "https://deno.land/x/oak@v6.0.1/helpers.ts";

type Option = {
  port?: number;
};

type Dependencies = {
  application?: Application;
  router?: Router;
  renderer?: Renderer;
};

export class DexrApp {
  readonly #application: Application;
  readonly #router: Router;
  #renderer: Renderer = createRenderer();
  #isStart: boolean = false;
  #compiledModule: Map<string, string> = new Map();

  constructor(dependencies?: Dependencies) {
    this.#application = dependencies?.application ?? new Application();
    this.#router = dependencies?.router ?? new Router();
  }

  useRenderer(layout: Renderer): this {
    this.#renderer = layout;
    return this;
  }

  async addPage(route: string, componentPath: string): Promise<void>;
  async addPage<T extends {}, U extends {}, P extends {}>(
    route: string,
    componentPath: string,
    renderProps?: (params: T, query: U) => Promise<P>
  ): Promise<void>;
  async addPage<T extends {}, U extends {}, P extends {}>(
    route: string,
    componentPath: string,
    renderProps?: (params: T, query: U) => Promise<P>
  ) {
    const fullPath = join(Deno.cwd(), componentPath);
    const App = (await import(`file://${fullPath}`)).default;
    // try {
    const { files } = await Deno.emit(fullPath);
    for (const [fileName, source] of Object.entries(files)) {
      console.log(fileName);
      console.log(source);
      const filePath = fromFileUrl(fileName).replace(Deno.cwd(), "");
      this.#compiledModule.set(filePath, source);
    }
    // } catch (err) {
    //   console.log(err);
    // }

    this.#router.get(route, async (context) => {
      context.response.headers = new Headers({
        "content-type": "text/html; charset=UTF-8"
      });
      const query = getQuery(context, { mergeParams: false }) as U;
      const appProps = renderProps
        ? await renderProps(context.params as T, query)
        : undefined;
      context.response.body = this.#renderer.render(
        App,
        componentPath,
        appProps
      );
    });
  }

  async run(option?: Option) {
    if (this.#isStart) throw new Error("Dexr is already run!!!");
    // sync deno's import/client import
    for (const [key, source] of this.#compiledModule.entries()) {
      if (key.includes(".js")) {
        this.#router.get(key, (context) => {
          context.response.headers = new Headers({
            "content-type": "text/javascript; charset=UTF-8"
          });
          context.response.body = source;
        });
      }
    }

    const { port = 8000 } = option || {};

    this.#application.use(this.#router.routes());
    console.log(this.#router.entries());
    for (const bob of this.#router.entries()) {
      console.log(bob);
    }
    this.#application.listen({ port });
    this.#isStart = true;
    console.log(`serve: http://localhost:${port}/`);
  }
}

export const createDexr = () => new DexrApp();
