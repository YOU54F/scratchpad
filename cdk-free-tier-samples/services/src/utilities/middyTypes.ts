import { Callback, Context, Handler } from "aws-lambda";
import middyLib from "@middy/core";

// Extends the Context type second argument
export type withContext<H extends Handler, C extends Context> = ExtendContext<
  Parameters<H>,
  ReturnType<H>,
  C
>;
// Ensures that there are 3 arguments and the middle one is the context to update
type ExtendContext<
  Args extends [unknown, Context, unknown],
  ReturnType,
  C extends Context
> = (event: Args[0], context: C, callback: Args[2]) => ReturnType;

// the middy lib isn't typed correctly so these are some type fixes
export type MiddyHandler<E, R, C> = (
  event: E,
  context: C,
  callback: Callback<R>
) => void | Promise<R>;
export const middy = middyLib as <E, R, C extends Context>(
  handler: MiddyHandler<E, R, C>
) => middyLib.Middy<E, R, C>;
