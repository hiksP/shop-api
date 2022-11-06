const Router = require("express");
const brandRouter = require("./brandRouter");
const userRouter = require("./userRouter");
const clothingRouter = require("./clothingRouter");
const typeRouter = require("./typeRouter");
const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/clothing", clothingRouter);

module.exports = router;
