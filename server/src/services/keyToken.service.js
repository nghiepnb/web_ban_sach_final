const keyTokenSchema = require("../models/keyToken.model");
const { Types } = require("mongoose");
class KeyTokenService {
  static createKeyToken = async ({
    userId,
    privateKey,
    publicKey,
    refreshToken,
  }) => {
    try {
      // const tokens = await keyTokenSchema.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      // return tokens ? tokens.publicKey : null;
      const filter = {
          user: userId,
        },
        update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
        options = { upsert: true, new: true };
      const tokens = await keyTokenSchema.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keyTokenSchema.findOne({ user: new Types.ObjectId(userId) });
  };

  static removeKeyById = async (_id) => {
    return await keyTokenSchema.deleteOne(_id);
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenSchema.findOne({ refreshTokenUsed: refreshToken });
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenSchema.findOne({ refreshToken });
  };

  static deleteKeyById = async (userId) => {
    return await keyTokenSchema.deleteOne({ user: userId });
  };
}

module.exports = KeyTokenService;
