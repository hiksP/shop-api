const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async get(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    const elem = await Type.findByPk(id);
    if (!elem) {
      return next(ApiError.badRequest("Нет такого элемента"));
    }
    try {
      await Brand.destroy({
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

module.exports = new BrandController();
