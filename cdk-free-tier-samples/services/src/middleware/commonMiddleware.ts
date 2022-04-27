import middy from "@middy/core";
import * as AWSXray from "aws-xray-sdk-core";

const commonMiddleware = <E, R>(): middy.MiddlewareObject<E, R> => {
  return {
    after: async () => {
      AWSXray.capturePromise();
    }
  };
};

export default commonMiddleware;
