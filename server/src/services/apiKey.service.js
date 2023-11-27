const apiKeyModel = require("../models/apiKey.model");
const findById = async (key) => {
  try {
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
    return objKey;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  findById,
};
