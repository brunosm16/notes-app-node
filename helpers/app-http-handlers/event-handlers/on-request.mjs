import { debugFn } from "../../debug/debug-helpers.mjs";

export const onRequest = (req, res) =>
  debugFn(`${new Date().toISOString()} | ${req.method} | ${req.url}`);
