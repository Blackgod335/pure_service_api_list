import express from "express";

import * as technicianController from "../controller/technician.js";
import * as technicianValidation from '../validation/technicain.js';

const router = express.Router();

router.post("/createtechnician",technicianValidation.createTechnicianValidation, async (req, res) => {
  technicianController
    .createTechnician(req)
    .then((result) => {
      if (result.status == "DUPLICATE") {
        res.status(409).send(result.message);
      } else if (!result) {
        res.status(501).send(result);
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

router.get("/gettechnician", async (req, res) => {
  technicianController
    .getTechni(req)
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

router.get("/getsingletechnician/:userId", async (req, res) => {
  technicianController
    .getSingleTechnician(req)
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

router.put("/updatetechnician",technicianValidation.updateTechnicianValidation, async (req, res) => {
  technicianController
    .updateTechnician(req)
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

router.delete("/deletetechnician/:technicianId", async (req, res) => {
  technicianController
    .deleteTechnician(req)
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

export default router;
