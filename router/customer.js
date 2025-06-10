import * as customerController from "../controller/customer.js";
import * as customerValidation from '../validation/customer.js';
import express from "express";

const router = express.Router();

// Create Customer
router.post("/createcustomer",customerValidation.createCustomerValidate, async (req, res) => {
  await customerController
    .createCustomer(req)
    .then((result) => {
      if (result.status == "DUPLICATE") {
        res.status(409).send(result.message);
      } else if (!result) {
        res.status(500).send(result);
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

//Login customer
router.post("/logincustomer",customerValidation.loginValidate, (req, res) => {
  customerController
    .loginCustomer(req)
    .then((result) => {
      if (result.status == "NOTFOUND") {
        res.status(404).send(result.message);
      } else if (result.status == "INVALID") {
        res.status(401).send(result.message);
      } else if (!result) {
        res.status(500).send(result);
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

// Get Customer lists
router.get("/getcustomer", async (req, res) => {
  customerController
    .getCustomers(req)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

router.get("/getsinglecustomer/:userId", (req, res) => {
  customerController
    .getSingleCustomer(req)
    .then((result) => {
      if (result.status == "NOTFOUND") {
        res.status(404).send(result.message);
      } else if (!result) {
        res.status(500).send(result);
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

router.put("/updateCustomer",customerValidation.updateCustomerValidate, (req, res) => {
  customerController
    .updateCustomer(req)
    .then((result) => {
      if (result.status == "NOTFOUND") {
        res.status(404).send(result.message);
      } else if (!result) {
        res.status(500).send(result);
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

router.delete("/deletecustomer/:customerId", (req, res) => {
  customerController
    .deleteCustomer(req)
    .then((result) => {
      if (result.status == "NOTFOUND") {
        res.status(404).send(result.message);
      } else if (!result) {
        res.status(500).send(result);
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

router.post("/updatetagincustomer",customerValidation.updateTagInCustomerValidate, (req, res) => {
  customerController
    .addTagInCustomer(req)
    .then((result) => {
       if (!result) {
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
