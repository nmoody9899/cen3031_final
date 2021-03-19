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

  //TO-DO.... maybe
  if (orderStatus === "cancelled") {
    //put products back in store??
    //might have to take care of this above if admin has initial order it is "not processed"
    //get order and check status and if "not processed" it is entering processing
    //if order has state cancelled and admin is putting back in process then the stock has to be updated accordingly
    //i.e. if cancelled and being put back into processing order will have to decrement stocks accordingly
    //if in some other state and order is cancelled then the stocks will have to be incremented
  }

  console.log("ORDER UPDATED", updated);

  //res.json(updated);

  res.json({ ok: true });
};
