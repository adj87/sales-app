var express = require("express");
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
router.get("customers/:id?", function (req, res, next) {
  const { id } = req.params;
  knex
    .select("*")
    .from("orders")
    .where({ id: orderId })
    .then((res) => res)
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

module.exports = router;
