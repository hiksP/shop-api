const Router = require("express");
const BrandController = require("../controllers/brandController");
const router = new Router();

router.post("/", BrandController.create);
router.get("/", BrandController.get);
router.delete("/:id", BrandController.delete);

module.exports = router;
