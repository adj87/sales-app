var express = require("express");
var router = express.Router();
const knex = require("../db/knexDBConnection");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const { orderId, type } = req.params;

  knex
    .select("*")
    .from("fares")
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

/* GET fares listing by customerId */
router.get("/:customerId", function (req, res, next) {
  const { customerId } = req.params;
  knex
    .select("*")
    .from("fares")
    .where({ customer_id: parseInt(customerId) })
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
