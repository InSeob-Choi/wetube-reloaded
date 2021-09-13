import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
  );
  
  app.use(flash());
  app.use(localsMiddleware);
  
  app.use((req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });

  
  app.use("/uploads", express.static("uploads"));
  app.use("/static", express.static("assets"));
  app.use("/public", express.static("node_modules/@ffmpeg/core/dist"));
  
  app.use("/", rootRouter);
  app.use("/users", userRouter);
  app.use("/videos", videoRouter);
  app.use("/api", apiRouter);
  
export default app;