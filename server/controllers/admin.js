//orders, orderStatus
const Order = require("../models/order");

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("products.product")
    .populate({
      path: "products.product",
      populate: {
        path: "brand",
        model: "Brand",
      },
    })
    .populate({
      path: "orderedBy",
      model: "User",
    })
    .exec();

  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    { _id: orderId },
    { orderStatus },
    { returnOriginal: false }
  ).exec();

  console.log("ORDER UPDATED", updated);

  //res.json(updated);

  res.json({ ok: true });
};
