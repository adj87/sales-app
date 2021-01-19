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
  const customer_id = parseInt(customerId);
  knex
    .select("*")
    .from("fares")
    .whereIn("customer_id", [customerId, 1001])
    .then((data) => {
      const ownFare = Boolean(data.find((el) => el.customer_id == customer_id));
      if (ownFare) {
        const newData = data.filter((el) => el.customer_id === customer_id);
        return res.json(newData);
      } else {
        return res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
