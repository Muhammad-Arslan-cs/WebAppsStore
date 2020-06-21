const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Customers = require("../models/customers");

const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter
  .route("/")
  .get((req, res, next) => {
    Customers.find({})
      .then(
        (customers) => {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/JSON");
          res.json(customers);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Customers.create(req.body)
      .then(
        (customer) => {
          console.log("customer created", customer);
          res.statusCode = 200;
          res.setHeader("Content-type", "application/JSON");
          res.json(customer);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on dishes");
  })
  .delete((req, res, next) => {
    Customers.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/JSON");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

customerRouter
  .route("/:customerId")
  .get((req, res, next) => {
    Customers.findById(req.params.customerId)
      .then(
        (customer) => {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/JSON");
          res.json(customer);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.end("POST Operation not supported on /dishes/" + req.params.customerId);
  })
  .put((req, res, next) => {
    Customers.findByIdAndUpdate(
      req.params.customerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (customer) => {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/JSON");
          res.json(customer);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    res.end("Deleting dish " + req.params.customerId);
  });

module.exports = customerRouter;
