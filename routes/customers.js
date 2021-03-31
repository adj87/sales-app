var express = require("express");
const dayjs = require("dayjs");
var router = express.Router();
const knex = require("../db/knexDBConnection");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const { orderId, type } = req.params;

  knex
    .select("*")
    .from("customers")
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

/* GET users listing by orderId and orderType */
router.get("/:id?", function (req, res, next) {
  const { id } = req.params;
  if (isNaN(id)) {
    next();
  }
  knex
    .select("*")
    .from("customers")
    .where({ id })
    .first()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

router.post("/", function (req, res, next) {
  const { body } = req;
  let { id, ...customer } = body;
  customer.created_at = dayjs().format("YYYY-MM-DD");
  customer.updated_at = dayjs().format("YYYY-MM-DD");
  customer.id = Math.floor(Math.random().toString() * 10000000);

  return knex("customers")
    .insert(customer)
    .then(function () {
      res.send({ success: true, info: "Customer created successfully" });
    })
    .catch(function (e) {
      res.status(500).json({ success: false, info: "Something went wrong" });
    });
});

router.put("/:id", function (req, res, next) {
  const { body } = req;
  const { id } = req.params;
  let customer = body;

  return knex
    .transaction(async function (trx) {
      await trx("customers").where({ id }).update(customer);
    })
    .then(function () {
      res.send({ success: true, info: "Customer edited successfully" });
    })
    .catch(function (e) {
      res.status(500).json({ success: false, info: "Something went wrong" });
    });
});

router.get("/routes", function (req, res, next) {
  const routes = [
    { id: "1a", name: "Sierra parte A" },
    { id: "2a", name: "Sierra parte B" },
    { id: "3b", name: "Zona condado" },
  ];
  res.json(routes);
});

router.get("/payments-methods", function (req, res, next) {
  const methods = [
    { id: "CO", name: "Contado" },
    { id: "30", name: "Pagaré 30 días" },
    { id: "60", name: "Pagaré 60 días" },
  ];
  res.json(methods);
});

module.exports = router;
