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
        .from("order_lines")
        .where({ order_id: orderId, order_type: orderType })
        .then((order_lines) => {
          const ordersWithOrderLines = { ...orders, order_lines };
          res.json(ordersWithOrderLines);
        })
        .catch((err) => res.status(500).json({ error: err.sqlMessage }));
    })
    .catch((err) => res.status(500).json({ error: err.sqlMessage }));
});

router.post("/", function (req, res, next) {
  const { body } = req;
  let { order_lines, id, ...order } = body;
  return knex("orders")
    .insert(order)
    .then((id) => {
      order_lines = order_lines.map((el) => ({
        ...el,
        order_id: id,
        order_type: order.type,
      }));
      return knex("order_lines")
        .insert(order_lines)
        .then(() => res.send({ success: true }))
        .catch((e) => {
          console.log(e);
          res.json({ success: false });
        });
    })
    .catch((e) => {
      console.log(e);
      res.json({ success: false });
    });
});

module.exports = router;
