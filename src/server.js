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

  /* 그런데.. 이게 없어도 통신이 잘 되네... 왜 그런지 모르겠어... 원래 안 됐었는데
  import cors from "cors"; // 🚨 SOP 외에 CORS가 동작하도록 다음의 설정을 해줌.
  
  let corsOption = {
  origin: 'https://wetube-coco.s3.amazonaws.com', // 허락해주길 요청하는 주소
  credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줌
  }
  
  app.use(cors(corsOption));
  */

  // app.use((req, res, next) => { // 🚨 로컬호스트에서만 할 때는 CORS 방안으로 통했는데, aws 사용한 뒤에는 안됨. 그래서 'cors'를 설치하여 적용함.
  //   res.header("Cross-Origin-Resource-Policy", "cross-origin");
  //   res.header("Cross-Origin-Opener-Policy", "same-origin");
  //   res.header("Cross-Origin-Embedder-Policy", "require-corp");
  //   next();
// });

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/public", express.static("node_modules/@ffmpeg/core/dist"));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
