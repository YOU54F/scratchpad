import { opine } from "https://deno.land/x/opine@1.2.0/mod.ts";
import { superdeno } from "https://deno.land/x/superdeno@4.1.0/mod.ts";
import { expect } from "https://x.nest.land/expect@0.2.4/mod.ts";

const app = opine();

app.get("/", (req, res) => {
  res.send("Hello Deno!");
});

Deno.test("it should support regular expressions", async () => {
  await superdeno(app)
    .get("/")
    .expect("Content-Type", /^application/)
    .end((err) => {
      expect(err.message).toEqual(
        'expected "Content-Type" matching /^application/, got "text/html; charset=utf-8"'
      );
    });
});
