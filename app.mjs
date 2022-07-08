import { default as express } from "express";
import { default as hbs } from "hbs";
import { default as logger } from "morgan";
import { default as cookieParser } from "cookie-parser";
import { default as bodyParser } from "body-parser";
import * as path from "path";
import * as http from "http";
import { NotesInMemory } from "./models/notes-in-memory/notes-in-memory.mjs";
import { indexRouter } from "./routes/indexRouter.mjs";
import { normalizePort } from "./helpers/app-http-handlers/others/normalize-port.mjs";
import {
  onError,
  onListening,
} from "./helpers/app-http-handlers/event-handlers/index.mjs";

import {
  handler404Error,
  handlerBasicError,
} from "./helpers/app-http-handlers/error-handlers/index.mjs";
import { default as __dirname } from "./directory-name.mjs";

export const NotesStore = new NotesInMemory();
export const app = express();
export const port = normalizePort(process.env.PORT || "3000");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("port", port);
hbs.registerPartials(path.join(__dirname, "partials"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use(handler404Error);
app.use(handlerBasicError);

export const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
