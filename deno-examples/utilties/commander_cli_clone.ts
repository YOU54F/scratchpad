import Denomander, { Option } from "https://deno.land/x/denomander/mod.ts";

const program = new Denomander({
  app_name: "My App Name",
  app_description: "My App Description",
  app_version: "1.0.1"
});

program
  .command("serve", "Start up the server")
  .option("-a, --address", "Define the address", undefined, "localhost")
  .option("-p | --port", "Define the port", undefined, 8888)
  .action(() => {
    const { address, port } = program;
    console.log(`Server is running on ${address}:${port}`);
  });

program.parse(Deno.args);
