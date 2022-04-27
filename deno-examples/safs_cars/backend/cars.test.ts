import { superdeno } from "../deps_test.ts";
import { opine, json } from "../deps_server.ts";
import { router } from "./cars.routes.ts";

Deno.test("Returns all cars", async () => {
  const expectedResult = {
    success: true,
    data: [
      {
        id: 1,
        name: "yellow peril",
        manufacturer: "Volkwagen",
        make: "Golf",
        model: "Coupe S",
        year: 1985,
        registration: "B745BGP",
        status: "OWNED"
      },
      {
        id: 2,
        name: "brian",
        manufacturer: "BMW",
        make: "E21",
        model: "316i",
        year: 1981,
        registration: "OYF544Y",
        status: "OWNED"
      },
      {
        id: 3,
        name: "orangina",
        manufacturer: "Volkwagen",
        make: "Golf",
        model: "LS",
        year: 1981,
        registration: "FMC29V",
        status: "OWNED"
      }
    ]
  };
  const app = opine();
  app.use(json());
  app.use(router);

  await superdeno(app)
    .get("/cars")
    .expect(200)
    .expect(expectedResult)
    .expect("Content-Type", /json/);
});

Deno.test("Returns car by id", async () => {
  const expectedCar = {
    success: true,
    data: {
      id: 1,
      name: "yellow peril",
      manufacturer: "Volkwagen",
      make: "Golf",
      model: "Coupe S",
      year: 1985,
      registration: "B745BGP",
      status: "OWNED"
    }
  };
  const app = opine();
  app.use(json());
  app.use(router);
  await superdeno(app)
    .get("/cars/1")
    .expect(200)
    .expect(expectedCar)
    .expect("Content-Type", /json/);
});

Deno.test("deletes car by id", async () => {
  const app = opine();
  app.use(json());
  app.use(router);
  await superdeno(app)
    .delete("/cars/1")
    .expect(200)
    .expect({
      success: true
    })
    .expect("Content-Type", /json/);
  await superdeno(app)
    .get("/cars/1")
    .expect(404)
    .expect({
      success: false,
      msg: "Not found"
    })
    .expect("Content-Type", /json/);
});

Deno.test("creates a car", async () => {
  const expectedCar = {
    success: true,
    data: {
      id: 5,
      name: "yellow peril",
      manufacturer: "Volkwagen",
      make: "Golf",
      model: "Coupe S",
      year: 1985,
      registration: "B745BGP",
      status: "DECEASED"
    }
  };
  const app = opine();
  app.use(json());
  app.use(router);
  await superdeno(app)
    .post("/cars")
    .send(expectedCar.data)
    .expect(expectedCar)
    .expect(200)
    .expect("Content-Type", /json/);
});

Deno.test("updates a car", async () => {
  const expectedCar = {
    success: true,
    data: {
      id: 1,
      name: "yellow peril",
      manufacturer: "Volkwagen",
      make: "Golf",
      model: "Coupe S",
      year: 1985,
      registration: "B745BGP",
      status: "DECEASED"
    }
  };
  const app = opine();
  app.use(json());
  app.use(router);
  await superdeno(app)
    .put("/cars/2")
    .send(expectedCar.data)
    .expect(expectedCar)
    .expect(200)
    .expect("Content-Type", /json/);
});
