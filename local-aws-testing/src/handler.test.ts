import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { handler } from "./handler";

describe("Hello world handler", () => {
  it("should return hello world", async () => {
    // arrange
    const mockEvent = {} as APIGatewayProxyEventV2;
    const mockContext = {} as Context;
    const expectedResult = "hello world";

    // act
    const result = await handler(mockEvent, mockContext);

    // assert
    expect(result).toEqual(expectedResult);
  });
});
