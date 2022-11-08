const Router = require("express");
const ClothingController = require("../controllers/clothingController");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.post("/", checkRole("ADMIN"), ClothingController.create);
router.get("/", ClothingController.get);
router.get("/:id", ClothingController.getById);
router.delete("/:id", ClothingController.delete);

module.exports = router;
