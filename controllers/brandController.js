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

  // доделать отлов ошибок, удаления того что уже удалено
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      ApiError.badRequest();
    }
    try {
      await Brand.destroy({
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

module.exports = new BrandController();
