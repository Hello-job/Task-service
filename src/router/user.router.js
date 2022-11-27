const Router = require("koa-router");

const {
  useValidator,
  verifyUser,
  encryptionPassword,
  verifyLogin,
} = require("../middleware/use.middleware");

const { auth } = require("../middleware/auth.middleware");

const { register, login, updataPaw } = require("../controller/user.controller");

const router = new Router();

router.post(
  "/register",
  useValidator,
  verifyUser,
  encryptionPassword,
  register
);

router.post("/login", useValidator, verifyLogin, login);

router.patch("/updataPassword", auth, updataPaw);

module.exports = router;
