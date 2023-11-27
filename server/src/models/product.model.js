const mongoose = require("mongoose"); // Erase if already required
const slugify = require("slugify");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    product_discount : {
      type: Number,
      default : 0
    },
    product_thumb: {
      type: String,
      require: true,
    },
    product_price: {
      type: String,
      require: true,
    },
    product_description: String,
    product_slug: String,
    product_quantity: {
      type: Number,
      require: true,
    },
    product_type: {
      type: String,
      require: true,
      enum: ["Clothings", "Furniture" , "Phone" , "Book" , "Clock"],
    },
    product_shop: {
      type: String,
      ref: "Shop",
    },
    product_attribute: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    product_ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: Array,
      default: [],
    },
    product_reviews : {
      type : Array,
      default : []
    },
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
//Create index for search
productSchema.index({ product_name: "text", product_description: "text" });
//Document middleware : run before .save() and .create()
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

const clothingSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, require: true },
    model: {
      type: String,
      require: true,
    },
    color: String,
  },
  {
    collection: "clothes",
    timestamps: true,
  }
);

const electronicSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, require: true },
    model: {
      type: String,
      require: true,
    },
    color: String,
  },
  {
    collection: "electronics",
    timestamps: true,
  }
);

const furnitureSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, require: true },
    model: {
      type: String,
      require: true,
    },
    color: String,
  },
  {
    collection: "furniture",
    timestamps: true,
  }
)
const phoneSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, require: true },
    model: {
      type: String,
      require: true,
    },
    color: String,
  },
  {
    collection: "phone",
    timestamps: true,
  }
);
const bookSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, require: true },
    model: {
      type: String,
      require: true,
    },
    color: String,
  },
  {
    collection: "book",
    timestamps: true,
  }
);
const clockSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, require: true },
    model: {
      type: String,
      require: true,
    },
    color: String,
  },
  {
    collection: "clock",
    timestamps: true,
  }
);

//Export the model
module.exports = {
  product: mongoose.model(DOCUMENT_NAME, productSchema),
  electronic: mongoose.model("Electronics", electronicSchema),
  clothing: mongoose.model("Clothings", clothingSchema),
  phone: mongoose.model("Phone", phoneSchema),
  book: mongoose.model("Book", bookSchema),
  clock: mongoose.model("Clock", clockSchema),
  furniture: mongoose.model("Furniture", furnitureSchema),
};
