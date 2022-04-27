import pinoLib from "pino";

export const createLogger = (pino: typeof pinoLib) => {
  const isLiveStage = ["prod"].includes(process.env.STAGE ?? "");

  const rootLogger = pino({
    level: isLiveStage ? "info" : process.env.PINO_LEVEL || "debug"
  });

  return rootLogger.child({
    context: {
      traceId: process.env._X_AMZN_TRACE_ID,
      lambdaName: process.env.AWS_LAMBDA_FUNCTION_NAME
    }
  });
};

export default createLogger(pinoLib);
