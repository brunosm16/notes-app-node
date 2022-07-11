import { default as express } from "express";
import { default as hbs } from "hbs";
import { default as logger } from "morgan";
import { default as cookieParser } from "cookie-parser";
import { default as bodyParser } from "body-parser";
import { default as dotenv } from "dotenv";
import { default as debug } from "debug";
import * as path from "path";
import * as http from "http";
import { NotesInMemory } from "./models/notes-in-memory/notes-in-memory.mjs";
import { homeRouter, notesRouter } from "./routes/index.mjs";
import { normalizePort } from "./helpers/app-http-handlers/others/normalize-port.mjs";
import {
  onError,
  onListening,
  onRequest,
  onUncaughtException,
  onUnhandledException,
} from "./helpers/app-http-handlers/event-handlers/index.mjs";

import {
  handler404Error,
  handlerBasicError,
} from "./helpers/app-http-handlers/error-handlers/index.mjs";
import { default as __dirname } from "./directory-name.mjs";
import { morganStream } from "./helpers/app-http-handlers/others/morgan-stream.mjs";

export const NotesStore = new NotesInMemory();
export const app = express();
export const port = normalizePort(process.env.PORT || "3000");

dotenv.config();
const logFormat = process.env.LOG_FORMAT || "dev";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("port", port);
hbs.registerPartials(path.join(__dirname, "partials"));

app.use(logger(logFormat, { stream: morganStream(process.env.LOG_FILE) }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/assets/vendor/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/assets/vendor/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use(
  "/assets/vendor/popper.js",
  express.static(path.join(__dirname, "node_modules/popper.js"))
);

app.use(
  "/assets/vendor/feather-icons",
  express.static(path.join(__dirname, "node_modules/feather-icons/dist"))
);
app.use("/", homeRouter);
app.use("/notes", notesRouter);
app.use(handler404Error);
app.use(handlerBasicError);

export const server = http.createServer(app);
server.listen(port);
server.on("request", onRequest);
server.on("error", onError);
server.on("listening", onListening);

process.on("uncaughtException", onUncaughtException);
process.on("unhandledRejection", onUnhandledException);
