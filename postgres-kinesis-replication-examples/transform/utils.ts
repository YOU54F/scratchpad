export const decode64 = (encoded: string) =>
  Buffer.from(encoded, "base64").toString();

export const encode64 = (string: string) =>
  Buffer.from(string).toString("base64");
