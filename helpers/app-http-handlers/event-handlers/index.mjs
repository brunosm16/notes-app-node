import { onError as errorEventHandler } from "./on-error.mjs";
import { onListening as onListeningEventHandler } from "./on-listening.mjs";
import { onRequest as onRequestHandler } from "./on-request.mjs";

export const onError = errorEventHandler;
export const onListening = onListeningEventHandler;
export const onRequest = onRequestHandler;
