import {
  beforeAll,
  afterEach,
  afterAll,
  beforeEach,
  group,
  test
} from "https://x.nest.land/hooked@0.1.0/mod.ts";

beforeAll(() => {
  console.log("Before all global");
});

beforeEach(() => {
  console.log("Before each global");
});

afterEach(() => {
  console.log("After each global");
});

afterAll(() => {
  console.log("After all global");
});

test("Global test", () => {});

group("Parent", () => {
  beforeAll(() => {
    console.log("Before all parent");
  });

  beforeEach(() => {
    console.log("Before each parent");
  });

  afterEach(() => {
    console.log("After each parent");
  });

  afterAll(() => {
    console.log("After all parent");
  });

  test("Parent test", () => {});

  group("Child", () => {
    beforeAll(() => {
      console.log("Before all child");
    });

    beforeEach(() => {
      console.log("Before each child");
    });

    afterEach(() => {
      console.log("After each child");
    });

    afterAll(() => {
      console.log("After all child");
    });

    test("Child test", () => {});
  });
});
