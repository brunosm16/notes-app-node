import { port } from "../../../app.mjs";
import { portBind } from "../others/port-bind.mjs";

const runError = (bind) => {
  const message =
    bind === "EACCES"
      ? `${bind} requires elevated privileges`
      : `${bind} is already in use`;
  console.log(message);
  process.exit(1);
};

export const onError = (error) => {
  if (error.syscall !== "listen") throw error;

  const bind = `${portBind(port)} ${port}`;
  const validCode = error.code === "EACCES" || error.code === "EADDRINUSE";

  if (validCode) runError(bind);
  else throw error;
};
