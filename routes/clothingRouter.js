const Router = require("express");
const ClothingController = require("../controllers/clothingController");
const router = new Router();

router.post("/", ClothingController.create);
router.get("/", ClothingController.get);
router.get("/:id", ClothingController.getById);
router.delete("/:id", ClothingController.delete);

module.exports = router;
