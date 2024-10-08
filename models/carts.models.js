const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
