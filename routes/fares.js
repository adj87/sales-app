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
  const { customerId :customer_id  } = req.params;
  knex
    .select("*")
    .from("fares")
    .whereIn("customer_id", [customer_id, "1001"])
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
      return res.json({
        success: true,
        data: req.body,
        info: "Fare created succesfully",
      });
    })
    .catch((err) => console.log("el err", err));
});

router.put("/customerId/:customerId/", (req, res, next) => {
  const { customerId: customer_id } = req.params;
  const fare = req.body;
  const { fare_lines } = fare;
  return knex
    .transaction(async function (trx) {
      await trx("fares").where({ customer_id }).del();
      await trx("fares").insert(fare_lines);
    })
    .then(function () {
      res.send({
        success: true,
        info: "Fare edited successfully",
        data: fare,
      });
    })
    .catch(function (e) {
      res.status(500).json({ success: false, info: "Something went wrong" });
    });
});

module.exports = router;
