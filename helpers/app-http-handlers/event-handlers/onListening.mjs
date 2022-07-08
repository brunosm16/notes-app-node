import { server } from "../../../app.mjs";
import { portBind } from "../others/port-bind.mjs";

export const onListening = () => {
  const address = server.address();
  const bind = `${portBind(address)} ${address.port}`;
  console.log(`Listening on ${bind}`);
};