const Router = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const router = new Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/auth", auth, userController.tokenCheck);

module.exports = router;
