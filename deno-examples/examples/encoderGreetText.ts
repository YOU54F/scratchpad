const encoder = new TextEncoder();
const greetText = encoder.encode("Yolo");
await Deno.writeFile("greet.txt", greetText);
