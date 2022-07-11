import { default as rotatingFS } from "rotating-file-stream";

export const morganStream = (logFile) => {
  if (!logFile) return process.stdout;

  return rotatingFS.createStream(logFile, {
    size: "10MB",
    interval: "1d",
    compress: "gzip",
  });
};
