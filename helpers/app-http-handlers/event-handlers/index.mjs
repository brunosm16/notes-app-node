import { onError as errorEventHandler } from "./on-error.mjs";
import { onListening as onListeningEventHandler } from "./onListening.mjs";

export const onError = errorEventHandler;
export const onListening = onListeningEventHandler;
