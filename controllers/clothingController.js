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

  async get(req, res) {
    const { brandId, typeId } = req.query;
    let { page, limit } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let clothing;
    if (!brandId && !typeId) {
      clothing = await Clothing.findAll({ limit, offset });
    }

    if (brandId && !typeId) {
      clothing = await Clothing.findAll({ where: { brandId }, limit, offset });
    }

    if (!brandId && typeId) {
      clothing = await Clothing.findAll({ where: { typeId }, limit, offset });
    }

    if (brandId && typeId) {
      clothing = await Clothing.findAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(clothing);
  }

  async getById(req, res) {}

  async delete(req, res) {}
}

module.exports = new ClothingController();
