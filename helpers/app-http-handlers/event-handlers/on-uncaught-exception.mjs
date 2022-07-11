export const onUncaughtException = (err) =>
  console.error(`Uncaught Exception : | ${err.stack || err}`);
