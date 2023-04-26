import { createLogger, stdSerializers } from "bunyan";

interface LoggerOptions {
  name: string;
}

export const getLogger = ({ name }: LoggerOptions) =>
  createLogger({
    name,
    serializers: {
      err: stdSerializers.err
    }
  });
