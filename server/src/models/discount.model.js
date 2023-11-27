const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

var discountSchema = new Schema(
  {
    discount_name: {
      type: String,
      require: true,
    },
    discount_description: {
      type: String,
      require: true,
    },
    discount_type: {
      type: String,
      default: "fixed_amount",
    },
    discount_value: {
      type: String,
      require: true,
    },
    discount_code: {
      type: String,
      require: true,
    },
    discount_start_date: {
      type: Date,
      require: true,
    },
    discount_end_day: {
      type: Date,
      require: true,
    },
    discount_max_user: {
      type: Number,
      require: true,
    },
    discount_user_count: {
      //max count used by user
      type: Number,
      require: true,
    },
    discount_min_order_value: {
      //max count used by user
      type: Number,
      require: true,
    },
    discount_user_used: {
      //arr user used
      type: Array,
      default: [],
    },
    discount_max_uses_per_user: {
      //count max allow one user used
      type: Number,
      require: true,
    },
    discount_shopId: {
      type: Schema.ObjectId,
      ref: "Shop",
    },
    discount_is_active: {
      type: Boolean,
      default: true,
    },
    discount_applies_to: {
      type: String,
      require: true,
      enum: ["all", "specific"],
    },
    discount_product_ids: {
      //count product to apply
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, discountSchema);
