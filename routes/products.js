var express = require("express");
var router = express.Router();
const knex = require("../db/knexDBConnection");

/* GET users listing. */
router.get("/", function (req, res, next) {
  knex
    .select("*")
    .from("products")
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

router.get("/:id?", function (req, res, next) {
  const { id } = req.params;
  knex
    .select("*")
    .from("products")
    .where({ id })
    .first()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

router.put("/:productId", function (req, res, next) {
  const { body } = req;
  const { productId: id } = req.params;
  const product = body;

  return knex
    .transaction(async function (trx) {
      await trx("products").where({ id }).update(product);
    })
    .then(function () {
      res.send({ success: true, info: "Product edited successfully" });
    })
    .catch(function (e) {
      res.status(500).json({ success: false, info: "Something went wrong" });
    });
});

module.exports = router;
