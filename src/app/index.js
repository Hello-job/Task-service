const path = require("path");

const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const koaParameter = require("koa-parameter");

const errHandle = require("./errHandler");

const router = require("../router");

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/uoload"),
      keepExtensions: true,
    },
  })
);

app.use(koaStatic(path.join(__dirname, "/uoload")));
app.use(koaParameter(app));
app.use(router.routes()).use(router.allowedMethods());
app.on("error", errHandle);

module.exports = app;
