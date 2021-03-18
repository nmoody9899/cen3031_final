//orders, orderStatus
const Order = require("../models/order");

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("products.product")
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

  res.json(updated);
};
