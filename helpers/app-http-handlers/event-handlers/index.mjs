import { onError as errorEventHandler } from "./on-error.mjs";
import { onListening as onListeningEventHandler } from "./on-listening.mjs";
import { onRequest as onRequestHandler } from "./on-request.mjs";
import { onUncaughtException as onUncaught } from "./on-uncaught-exception.mjs";
import { onUnhandledException as onUnhandled } from "./on-unhandled-exception.mjs";

export const onError = errorEventHandler;
export const onListening = onListeningEventHandler;
export const onRequest = onRequestHandler;
export const onUncaughtException = onUncaught;
export const onUnhandledException = onUnhandled;
