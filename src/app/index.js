const path = require("path");

const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const koaParameter = require("koa-parameter");

const errHandle = require("./errHandler");

const router = require("../router");
var cors = require("koa2-cors");

// 配置插件
app.use(
  cors({
    // 任何地址都可以访问
    origin: "http://localhost:3000",
    // 指定地址才可以访问
    // origin: 'http://localhost:8080',
    maxAge: 2592000,
    // 必要配置
    credentials: true,
  })
);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
    parsedMethods: ["DELETE", "POST", "GET", "PUT", "PATCH"],
  })
);

app.use(koaStatic(path.join(__dirname, "../upload")));
app.use(koaParameter(app));
app.use(router.routes()).use(router.allowedMethods());
app.on("error", errHandle);

module.exports = app;
