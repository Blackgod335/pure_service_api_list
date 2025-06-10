import express from "express";

import * as userController from "../controller/user.js";
import * as userValidation from '../validation/user.js';

const router = express.Router();

router.post("/signup",userValidation.signupValidation, async (req, res) => {
  userController
    .signUp(req)
    .then((result) => {
      if (result.status == "DUPLICATE") {
        res.status(409).send(result.message);
      } else if (!result) {
        res.status(501).send({
          result
        });
      } else {
        res.status(201).send(result);
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

router.post("/logIn",userValidation.loginValidation, async (req, res) => {
  userController
    .logIn(req)
    .then((result) => {
      if (result.status == "NOTFOUND") {
        res.status(404).send(result.message);
      } else if (result.status == "INVALID") {
        res.status(401).send(result.message);
      } else if (!result) {
        res.status(501).send(result);
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

router.post("/forgetpassword",userValidation.forgetPasswordValidation, async (req, res) => {
  userController
    .forgetPassword(req)
    .then((result) => {
      if (result.status == "NOTFOUND") {
        res.status(404).send(result.message);
      } else if (!result) {
        res.status(501).send(result);
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

router.post("/setpassword",userValidation.setPasswordValidation, async (req, res) => {
  userController
    .setPassword(req)
    .then((result) => {
      if (result.status == "INVALID") {
        res.status(401).send(result.message);
      } else if (!result) {
        res.status(501).send(result);
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

router.post("/resetpassword",userValidation.resetPasswordValidation, async (req, res) => {
  userController
    .resetPassword(req)
    .then((result) => {
      if (result.status == "NOTFOUND") {
        res.status(404).send(result.message);
      } else if (result.status == "INVALID") {
        res.status(401).send(result.message);
      } else if (result.status == "INVALID_1") {
        res.status(401).send(result.message);
      } else if (!result) {
        res.status(501).send(result);
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

export default router;