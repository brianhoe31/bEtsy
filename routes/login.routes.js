const Express = require("express");
const LoginRoutes = Express.Router();
const LoginController = require('../controllers/login.controller');

LoginRoutes.get("/", function (req, res) {
    LoginController.index(req, res);
})

LoginRoutes.post("/", function (req, res) {
    LoginController.login(req, res);
})

LoginRoutes.get("/new", function (req, res) {
    LoginController.new(req, res,);
})

LoginRoutes.post("/new", async function (req, res) {
    LoginController.create(req, res);
})



module.exports = LoginRoutes;