const _ = require("lodash");
const User = require("../model/User");
const QuestionModel = require("../model/Question");
const AnserModel = require("../model/Answers");
const { validationResult } = require("express-validator");
const axios = require("axios");
require("dotenv/config");
let userController = {};
let askController = {};

userController.signin = (req, res, next) => {
  let body = req.body;
  User.findOne({ email: body.email.toLowerCase() })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "Email Not Found" });
      } else if (user) {
        user.comparePassword(body.password, (err, isMatch) => {
          if (err) {
            return res.status(400).json({ msg: "Invalid email or password." });
          }
          if (isMatch) {
            console.log(4);
            let token = user.generateAuthToken();
            let response = {};
            response.id = user._id;
            response.email = user.email;
            response.token = token;
            response.status = 200;
            response.msg = "Successfully signed in";
            return res.status(200).json(response);
          }
        });
      }
    })
    .catch((err) => {
      return res.json(500).json({ msg: "Server Error" });
    });
};
userController.signup = (req, res, next) => {
  console.log(req.body);
  let body = req.body;
  let user = new User(body);
  user.save((err, result) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({ msg: "Email already Exist" });
      }
      return res.status(500).json({ msg: "Unable to create User" });
    }
    console.log("aaa");
    let response = {};
    response = { ...result._doc };
    response.status = 200;
    response.msg = "Successfully created new user";
    return res.status(200).json(response);
  });
};

userController.update = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("payment", {
      transactionId: req.body.transactionId,
      merchantId: req.body.merchantId,
      amount: req.body.amount,
      error1: true,
      error2: false,
      errorMessage: errors.errors,
    });
  } else {
    res.json({});
  }
};

userController.delete = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("payment", {
      transactionId: req.body.transactionId,
      merchantId: req.body.merchantId,
      amount: req.body.amount,
      error1: true,
      error2: false,
      errorMessage: errors.errors,
    });
  } else {
    res.json({});
  }
};

askController.getQuestions = (req, res, next) => {
  console.log("page:", req.query.page);
  QuestionModel.find()
    .then((questions) => {
      console.log(questions.length);
      if (questions.length > 0) {
        res.json({ numberQuestions: questions.length, questions: questions });
      } else {
        res.status(404).json({ msg: "No Questions" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    });
};
askController.getAnswers = (req, res, next) => {
  if (req.query.id) {
    QuestionModel.findOne({ _id: req.query.id })
      .then((questions) => {
        if (questions) {
          AnserModel.find({ questionId: req.query.id })
            .then((answers) => {
              if (answers) {
                res.json({ questions: questions, answers: answers });
              } else {
                res.json({ questions: questions, answers: [] });
              }
            })
            .catch((err) => {
              res.status(500).json({ msg: "Server Error" });
            });
        } else {
          res.status(404).json({ msg: "No Such Question" });
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "Server Error" });
      });
  }
};

askController.postQuestion = (req, res, next) => {
  console.log(req.user, req.body);
  let body = req.body;
  if (req.body.tags !== "") {
    let tagArray = req.body.tags.split(",");
    req.body.tags = tagArray;
    // console.log(tagArray);
  }
  let qm = new QuestionModel(body);
  qm.save((err, result) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({ msg: "Question already Exist" });
      }
      return res.status(500).json({ msg: "Unable to create User" });
    }
    let response = {};
    response = { ...result._doc };
    response.status = 200;
    response.msg = "Successfully created new question.";
    return res.status(200).json(response);
  });
};

askController.postAnswers = (req, res) => {
  req.body.user = req.user.id;
  let ans = new AnserModel(req.body);
  ans
    .save()
    .then((savedAnd) => {
      res.json({ msg: "Answer Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    });
};
askController.increaseViews = (req, res) => {
  if (req.query.id) {
    QuestionModel.findOne({ _id: req.query.id })
      .then((question) => {
        if (question) {
          question.views += 1;
          question
            .save()
            .then((result) => {
              res.msg = "Views added";
              res.json(result);
            })
            .catch();
        }
      })
      .catch();
    res.json({});
  } else {
    res.status(400).json({ msg: "Id is missing" });
  }
};

askController.searchQuestion = (req, res) => {
  // title: { $regex: req.body.text, $options: "i" },
  QuestionModel.find({
    $or: [
      { title: { $regex: req.body.text, $options: "i" } },
      { tags: { $regex: req.body.text, $options: "i" } },
    ],
  })
    .sort({ updatedAt: 1 })
    .then((questions) => {
      console.log(questions);
      res.json({ questions });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server Error" });
    });
};
askController.putQuestion = (req, res, next) => {
  res.json({});
};
askController.deleteQuestion = (req, res, next) => {
  res.json({});
};
module.exports = {
  userController,
  askController,
};
