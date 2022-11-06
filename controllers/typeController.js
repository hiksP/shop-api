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

  // доделать отлов ошибок, удаления того что уже удалено
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      ApiError.badRequest();
    }
    try {
      await Type.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Успешно удалено" });
    } catch (e) {
      ApiError.internal(e);
    }
  }
}

module.exports = new TypeController();
