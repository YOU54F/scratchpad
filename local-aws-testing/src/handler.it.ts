import axios from "axios";

describe("Hello world handler integration test", () => {
  it("should return hello world", async () => {
    // arrange
    const sutUrl = "http://127.0.0.1:3000/dev/hello";
    const expectedResult = "hello world";

    // act
    const response = await axios.get(sutUrl);

    // assert
    expect(response.data).toEqual(expectedResult);
    expect(response.status).toEqual(200);
  });
});
