const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async get(req, res) {
    const types = await Type.findAll();
    return res.json(types);
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
      await Type.destroy({
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

module.exports = new TypeController();
