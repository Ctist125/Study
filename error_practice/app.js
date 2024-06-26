// 내부 라이브러리
const path = require("path");

// 외부 라이브러리
const express = require("express");
const expressSession = require("express-session");

// 프로젝트 내부 파일
const db = require("./data/database");
const createSessionConfig = require("./config/session");
const errorHandlerMiddlewares = require("./middlewares/error-handler");
const basicRoutes = require("./routes/basic.routes");
const authRoutes = require("./routes/auth.routes");

// express.js
const app = express();

// view engine 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// express 설정
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));

// 미들웨어 & 라우트
app.use(basicRoutes);
app.use("/auth", authRoutes);

app.use(errorHandlerMiddlewares.notFound);
app.use(errorHandlerMiddlewares.errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Database연결에 실패했습니다.");
    console.log(error);
  });
