const uuid = require("uuid");
const path = require("path");
const { Clothing } = require("../models/models");
const ApiError = require("../error/ApiError");

class ClothingController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const clothing = await Clothing.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      return res.json(clothing);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res) {}

  async getById(req, res) {}

  async delete(req, res) {}
}

module.exports = new ClothingController();
