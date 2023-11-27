const CartService = require("../services/cart.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");

class CartController {
  /**
   *
   */

  addToCart = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new cart success",
      metaData: await CartService.addToCart({
        ...req.body,
      }),
    }).send(res);
  };

  //update + -

  update = async (req, res, next) => {
    new SuccessResponse({
      message: "Update success",
      metaData: await CartService.addToCartV2({
        ...req.body,
      }),
    }).send(res);
  };

  //delete
  delete = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete success",
      metaData: await CartService.deleteUserCart({
        ...req.body,
      }),
    }).send(res);
  };

  listToCart = async (req, res, next) => {
    new SuccessResponse({
      message: "get list cart success",
      metaData: await CartService.getListUserCart({
        ...req.query,
      }),
    }).send(res);
  };
}

module.exports = new CartController();
