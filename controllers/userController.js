const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");

//доделать нормальную авторизацию, проверки валидацию
class UserController {
  async signup(req, res) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Неверный email или пароль"));
    }
  }

  async signin(req, res) {}

  async tokenCheck(req, res) {}
}

module.exports = new UserController();
