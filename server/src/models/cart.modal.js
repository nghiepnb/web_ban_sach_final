const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

var cartSchema = new Schema(
  {
    cart_state: {
      type: String,
      require: true,
      enum: ["active", "complete", "failed", "pending"],
      default: "active",
    },
    cart_products: {
      type: Array,
      require: true,
      default: [],
    },
    cart_count_product: {
      type: Number,
      require: true,
    },
    cart_userId: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = {
  cart: model(DOCUMENT_NAME, cartSchema),
};
