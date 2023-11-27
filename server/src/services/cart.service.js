const { convertIdToObjectMongodb } = require("../utils/index");

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { cart } = require("../models/cart.modal");
const { findProductById } = require("../models/repositories/product.repo");
/*

    Key feature : Cart Service
        -add Product to cart [user]
        -reduce product quantity....

*/

class CartService {
  static async createUserCart({ userId, product }) {
    const query = { cart_userId: userId, cart_state: "active" };

    const updateOrInsert = {
      $addToSet: {
        cart_products: product,
      },
    };
    const options = { upsert: true, new: true };

    return await cart.findOneAndUpdate(query, updateOrInsert, options);
  }

  static async updateUserCartQuantity({ userId, product }) {
    const { productId, quantity } = product;
    const query = {
        cart_userId: userId,
        cart_state: "active",
        "cart_product.productId": productId,
      },
      updateSet = {
        $inc: {
          "cart_products.$.quantity": quantity,
        },
      },
      options = { upsert: true, new: true };

    return await cart.findOneAndUpdate(query, updateSet, options);
  }

  static async addToCart({ userId, product = {} }) {
    //check cart exist?
    const userCart = await cart.findOne({ cart_userId: userId });
    if (!userCart) {
      //create cart for User
      return await CartService.createUserCart({ userId, product });
    }

    //exist cart but dont have product
    if (!userCart.cart_products.length) {
      userCart.cart_products = [product];
      return await userCart.save();
    }

    //exist cart and have this product
    return await CartService.updateUserCartQuantity({ userId, product });
  }
  //update
  static async addToCartV2({ userId, shop_order_ids = {} }) {
    const {
      productId,
      quantity,
      old_quantity,
    } = shop_order_ids[0]?.item_products[0];

    //check productId
    const foundProduct = await findProductById();
    if (!foundProduct) throw new NotFoundError("Not fount product");

    if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
      throw new NotFoundError("Product do not belong to the shop");
    }

    if (quantity === 0) {
      ///delete
    }

    return await CartService.updateUserCartQuantity({
      userId,
      product: [productId, (quantity -= old_quantity)],
    });
  }

  static async deleteUserCart({ userId, productId }) {
    const query = { cart_userId: userId, cart_state: "active" },
      updateSet = {
        $pull: {
          cart_products: {
            productId,
          },
        },
      };
    const deleteCart = await cart.updateOne(query, updateSet);

    return deleteCart;
  }

  static async getListUserCart({ userId }) {
    return await cart
      .findOne({
        cart_userId: +userId,
      })
      .lean();
  }
}

module.exports = CartService;
