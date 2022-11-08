const uuid = require("uuid");
const path = require("path");
const { Clothing, ClothingInfo } = require("../models/models");
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

      if (info) {
        info = JSON.parse(info);
        info.forEach((elem) => {
          ClothingInfo.create({
            title: elem.title,
            description: elem.description,
            clothingId: clothing.id,
          });
        });
      }

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
      clothing = await Clothing.findAndCountAll({ limit, offset });
    }

    if (brandId && !typeId) {
      clothing = await Clothing.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (!brandId && typeId) {
      clothing = await Clothing.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    if (brandId && typeId) {
      clothing = await Clothing.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(clothing);
  }

  async getById(req, res) {
    const { id } = req.params;
    const clothing = await Clothing.findOne({
      where: { id },
      include: [{ model: ClothingInfo, as: "info" }],
    });
    return res.json(clothing);
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    const elem = await Type.findByPk(id);
    if (!elem) {
      return next(ApiError.badRequest("Нет такого элемента"));
    }
    try {
      await Clothing.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Успешно удалено" });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ClothingController();
