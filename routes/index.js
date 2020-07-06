let { userController, askController } = require("../controller/index");

let userRoute = require("express").Router();
let askRoute = require("express").Router();
const userAUth = require("../middleware/auth");

const { check } = require("express-validator");

askRoute.get("/", askController.getQuestions);
askRoute.post("/", userAUth, askController.postQuestion);
askRoute.put("/", askController.putQuestion);
askRoute.delete("/", askController.deleteQuestion);
askRoute.post("/answer", userAUth, askController.postAnswers);
askRoute.post("/search", askController.searchQuestion);
askRoute.get("/addviews", askController.increaseViews);
askRoute.get("/single", askController.getAnswers);

userRoute.post("/", userController.signup);
userRoute.put("/", userController.update);
userRoute.delete("/", userController.delete);
userRoute.post("/login", userController.signin);

module.exports = {
  userRoute,
  askRoute,
};
