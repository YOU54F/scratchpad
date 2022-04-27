import { Context } from "aws-lambda";
import { middy, MiddyHandler } from "../utilities/middyTypes";
import commonMiddleware from "./commonMiddleware";

export const useMiddyNonHttp = <E, R, C extends Context>(
  handler: MiddyHandler<E, R, C>
) => {
  return middy(handler).use(commonMiddleware<E, R>());
};
