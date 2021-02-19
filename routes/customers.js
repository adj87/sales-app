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
router.get("/:id?", function (req, res, next) {
  const { id } = req.params;
  console.log("yeahhhhhhh", id);
  knex
    .select("*")
    .from("customers")
    .where({ id })
    .first()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

module.exports = router;
