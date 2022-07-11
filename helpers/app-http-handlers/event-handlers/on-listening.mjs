import { server } from "../../../app.mjs";
import { portBind } from "../others/port-bind.mjs";
import { debugFn } from "../../debug/debug-helpers.mjs";

export const onListening = () => {
  const address = server.address();
  const bind = `${portBind(address)} ${address.port}`;
  debugFn(`Listening on ${bind}`);
};
