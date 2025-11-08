const expres = require("express")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const router = expres.Router()


// palce order
router.post("/",  async (req, res) => {
  try {
    const { orderItems, shippingAddress, shippingFee, subtotal, totalPrice } = req.body;

    // Validation
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    //  Create Order
    const order = await Order.create({

      orderItems,
      shippingAddress,
      shippingFee,
      subtotal,
      totalPrice,
    });

    // Reduce stock for each product
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty },
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router