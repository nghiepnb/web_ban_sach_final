const { convertIdToObjectMongodb } = require("../../utils");
const { cart } = require("../cart.modal");

const findCartById = async (cartId) => {
  return await cart
    .findOne({ _id: convertIdToObjectMongodb(cartId), cart_state: "active" })
    .lean();
};

module.exports = {
  findCartById,
};
