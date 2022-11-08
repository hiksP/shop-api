const Router = require("express");
const TypeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.post("/", checkRole("ADMIN"), TypeController.create);
router.get("/", TypeController.get);
router.delete("/:id", TypeController.delete);

module.exports = router;
