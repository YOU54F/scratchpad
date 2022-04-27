import { createDexr } from "./dexr/mod.ts";

const dexr = createDexr();
await dexr.addPage("/", "/App.tsx");
await dexr.run();
