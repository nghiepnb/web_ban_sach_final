const { convertIdToObjectMongodb } = require("../utils/index");

const discount = require("../models/discount.model");
const { findAllProducts } = require("../models/repositories/product.repo");
const {
  findAllDiscountCodeSelect,
  findAllDiscountCodeUnSelect,
} = require("../models/repositories/discount.repo");

const { BadRequestError, NotFoundError } = require("../core/error.response");
class DiscountService {
  static async createDiscountCode(payload) {
    const {
      code,
      start_date,
      end_date,
      is_active,
      shopId,
      min_order_value,
      product_ids,
      applies_to,
      name,
      description,
      type,
      value,
      max_uses,
      uses_count,
      max_uses_per_user,
      users_used,
    } = payload;
    if (new Date(start_date) >= new Date(end_date))
      throw new BadRequestError("start date must be before end date");

    //create index for discount code
    const foundDiscount = await discount.findOne({
      discount_code: code,
      discount_shopId: convertIdToObjectMongodb(shopId),
    });

    if (foundDiscount && foundDiscount.discount_is_active)
      throw new BadRequestError("discount exits!");

    const newDiscount = await discount.create({
      discount_name: name,
      discount_description: description,
      discount_type: type,
      discount_value: value,
      discount_code: code,
      discount_start_date: new Date(start_date),
      discount_end_date: new Date(end_date),
      discount_max_user: max_uses,
      discount_user_count: uses_count,
      discount_user_used: users_used,
      discount_max_uses_per_user: max_uses_per_user,
      discount_min_order_value: min_order_value,
      discount_shopId: shopId,
      discount_is_active: is_active,
      discount_applies_to: applies_to,
      discount_product_ids: applies_to == "all" ? [] : product_ids,
    });

    return newDiscount;
  }

  static async updateDiscountCode() {}

  //Get all discount codes available with product

  static async getAllDiscountCodeWithProduct({
    code,
    shopId,
    userId,
    limit = 50,
    page = 1,
  }) {
    //create index for discount_code
    const foundDiscount = await discount.findOne({
      discount_code: code,
      discount_shopId: convertIdToObjectMongodb(shopId),
    });

    if (!foundDiscount || !foundDiscount.discount_is_active)
      throw new NotFoundError("discount not exists!", 401);

    const { discount_applies_to, discount_product_ids } = foundDiscount;
    let products;
    if (discount_applies_to == "all") {
      //get all s
      products = await findAllProducts({
        filter: {
          product_shop: convertIdToObjectMongodb(shopId),
          isPublished: true,
        },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }

    if (discount_applies_to == "specific") {
      //get product by id
      products = await findAllProducts({
        filter: {
          _id: { $in: discount_product_ids },
          isPublished: true,
        },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }
    return products;
  }

  //Get all discount codes available with shop

  static async getAllDiscountCodeWithShop({ limit = 50, page = 1, shopId }) {
    const discounts = await findAllDiscountCodeUnSelect({
      limit: +limit,
      page: +page,
      filter: {
        discount_shopId: convertIdToObjectMongodb(shopId),
        discount_is_active: true,
      },
      unSelect: ["__v", "discount_shopId"],
      model: discount,
    });

    return discounts;
  }

  /*
    Apply Discount cod
    products = [
      {},
      {}
    ]
  */

  static async getDiscountAmount({ codeId, userId, shopId, products }) {
    const foundDiscount = await checkDiscountExists({
      model: discount,
      filter: {
        discount_code: codeId,
        discount_shopId: convertIdToObjectMongodb(shopId),
      },
    });

    if (foundDiscount) throw new BadRequestError("discount exits!");

    const { discount_is_active, discount_max_user } = foundDiscount;

    if (!discount_is_active) throw new NotFoundError("discount expried");
    if (!discount_max_user) throw new NotFoundError("discount are out");

    if (
      new Date() < new Date(discount_start_date) ||
      new Date() > new Date(discount_end_date)
    ) {
      throw new NotFoundError("discount code has expried");
    }

    //check value min
    let totalOrder = 0;
    if (discount_min_order_value > 0) {
      //get total
      totalOrder = products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);

      if (totalOrder < discount_min_order_value) {
        throw new NotFoundError("discount require a minium order value");
      }
    }

    if (discount_max_uses_per_user > 0) {
      const userUserDiscount = discount_user_used.find(
        (userId) => userId.userId === userId
      );
      if (userUserDiscount) {
        //...
      }
    }

    const amount =
      discount_type === "fixed_amount"
        ? discount_value
        : totalOrder * (discount_value / 100);

    return {
      totalOrder,
      discount: amount,
      totalPrice: totalOrder - amount,
    };
  }

  static async deleteDiscountCode({ shopId, codeId }) {
    const foundDiscount = "";
    if (foundDiscount) {
      //deleted
    }
    const deleted = await discount.findOneAndDelete({
      discount_code: codeId,
      discount_shopId: convertIdToObjectMongodb(shopId),
    });

    return deleted;
  }

  static async cancelDiscountCode({ codeId, shopId, userId }) {
    const foundDiscount = await checkDiscountExists({
      model: discount,
      filter: {
        discount_code: codeId,
        discount_shopId: convertIdToObjectMongodb(shopId),
      },
    });

    if (!foundDiscount) throw new NotFoundError("discount doesn exitst");

    const result = await discount.findByIdAndUpdate(foundDiscount._id, {
      $pull: {
        discount_user_used: userId,
      },
      $inc: {
        discount_max_user: 1,
        discount_user_count: -1,
      },
    });

    return result;
  }
}

module.exports = DiscountService;
