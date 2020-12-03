var express = require("express");
var router = express.Router();
const knex = require("../db/knexDBConnection");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const { orderId, type } = req.params;
  console.log(orderId, type);

  knex
    .select("*")
    .from("orders")
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

/* GET users listing by orderId and orderType */
router.get("/:orderId/type/:orderType", function (req, res, next) {
  const { orderId, orderType } = req.params;
  knex
    .select("*")
    .from("orders")
    .where({ id: orderId, type: orderType })
    .first()
    .then((orders) => {
      knex
        .select("*")
        .from("orders_lines")
        .where({ order_id: orderId, order_type: orderType })
        .then((order_lines) => {
          const ordersWithOrderLines = { ...orders, order_lines };
          res.json(ordersWithOrderLines);
        })
        .catch((err) => res.status(500).json({ error: err.sqlMessage }));
    })
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

module.exports = router;
