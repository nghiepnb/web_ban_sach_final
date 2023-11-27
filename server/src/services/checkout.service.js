const { findCartById } = require("../models/repositories/cart.repo");
const { BadRequestError, NotFoundError } = require("../core/error.response");

const { getDiscountAmount } = require("./discount.service");
class CheckoutService {
  /**
        {
            cartId , 
            userId ,
            shop_order_ids : [
                {
                    shopId , 
                    shop_discount : [
                        {
                            shopId,
                            discountId,
                            codeId
                        }
                    ],
                    item_products : [
                        {
                            price,
                            quantity,
                            productId
                        },
                        {
                            price,
                            quantity,
                            productId
                        }
                    ]
                }
            ]
        }
     */
  static async checkoutReview({ cartId, userId, shop_order_ids = [] }) {
    //check cartId exists
    const foundCart = await findCartById(cartId);
    if (!foundCart) throw new BadRequestError("cart does not exits");

    const checkout_order = {
        totalPrice: 0,
        feeShip: 0,
        totalCheckout: 0,
        totalDiscount: 0,
      },
      shop_order_ids_new = [];

    for (let i = 0; i < shop_order_ids.length; i++) {
      const {
        shopId,
        shop_discounts = [],
        item_products: [],
      } = shop_order_ids[i];
      //check product available
      const checkProductServer = await checkProductServer(item_products);
      if (!checkProductServer[0]) throw new BadRequestError("order wrong");
      //price order
      const checkoutPrice = checkProductServer.reduce((acc, product) => {
        return (acc = product.quantity * product.price);
      });

      //price before handle
      checkout_order.totalCheckout += checkoutPrice;

      const itemCheckout = {
        shopId,
        shop_discounts,
        priceRaw: checkoutPrice, //price before discount
        priceApplyDiscount: checkoutPrice,
        item_products: checkProductServer,
      };

      //check shop_discount exist >0 , check invalid
      if (shop_discounts.length > 0) {
        //suppose one discount
        //get amount discount
        const { totalPrice = 0, discount = 0 } = await getDiscountAmount({
          codeId: shop_discounts[0].codeId,
          userId,
          shopId,
          products: checkProductServer,
        });

        checkout_order.totalDiscount += discount;

        if (discount > 0) {
          itemCheckout.priceApplyDiscount = checkoutPrice - discount;
        }
      }

      //order reduce end
      checkout_order.totalCheckout += itemCheckout.priceApplyDiscount;
      shop_order_ids_new.push(itemCheckout);
    }

    return {
      shop_order_ids,
      shop_order_ids_new,
      checkout_order,
    };
  }

  static async orderByUser({
    shop_order_ids_new,
    cartId,
    userId,
    user_address = {},
    user_payment = {},
  }) {
    // const {
    //   shop_order_ids_new,
    //   checkout_order,
    // } = await CheckoutService.checkoutReview({
    //   cartId,
    //   userId,
    //   shop_order_ids,
    // });

    // //check lai lan nua xem con ton kho hay khong
    // const products = shop_order_ids_new.flatmap((order) => order.item_products);
  }
}

module.exports = CheckoutService;
