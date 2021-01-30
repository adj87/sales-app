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

router.post("/", (req, res, next) => {
  return knex("fares")
    .insert(req.body.fare_lines)
    .then((data) => {
      console.log("aqui la tienes", data);
      return res.json({ success: true, data: req.body });
    })
    .catch((err) => console.log("el err", err));
});

router.put("/:customerId", (req, res, next) => {
  const { customerId } = req.params;
  console.log(req);
  knex("fares")
    .where("customer_id", customerId)
    .del()
    .then(() => {
      knex("fares").insert();
    });
});

module.exports = router;
