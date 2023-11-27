const shopModal = require("../models/shop.model");
const { createTokenPair, verifyJWT } = require("../auth/authUntils");
const KeyTokenService = require("../services/keyToken.service");
const { findByEmail } = require("./shop.service");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  ConflictRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RolesShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITER: "EDITER",
  ADMIN: "ADMIN",
};

class AccessService {
  /*
  check token userd?
  */
  static handlerRefreshToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );
    if (foundToken) {
      //decode see userId
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );
      console.log({ userId, email });
      //Delete all in keyStore
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("Something wrong happen !! Please re login");
    }

    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) throw new AuthFailureError("Shop not register", 401);

    //verifyToken
    const { userId, email } = await verifyJWT(
      refreshToken,
      holderToken.privateKey
    );
    console.log("dvk", { userId, email });

    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new AuthFailureError("Shop not register", 402);

    //create pair new
    const tokens = await createTokenPair(
      { userId, email },
      holderToken.publicKey,
      holderToken.privateKey
    );

    //update
    await holderToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken, //add refresh token used
      },
    });

    return {
      user: { userId, email },
      tokens,
    };
  };

  static handlerRefreshTokenV2 = async ({ refreshToken, user, keyStore }) => {
    const { userId, email } = user;

    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("Something wrong happen !! Please re login");
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError("Shop not register", 401);
    }

    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new AuthFailureError("Shop not register", 402);

    //create pair new
    const tokens = await createTokenPair(
      { userId, email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    //update
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken, //add refresh token used
      },
    });

    return {
      user,
      tokens,
    };
  };

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not register");

    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("AuthFailure error", 401);

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      metaData: {
        shop: getInfoData({
          fields: ["email", "name", "_id", "roles"],
          object: foundShop,
        }),
        tokens,
      },
    };
  };

  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModal.findOne({ email }).lean();

    if (holderShop) {
      throw new BadRequestError("Error : Shop already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await shopModal.create({
      name,
      email,
      password: passwordHash,
      roles: [RolesShop.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        privateKey,
        publicKey,
      });

      if (!keyStore) {
        return {
          code: "xxxx",
          message: "keyStore error",
        };
      }
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );
      return {
        code: 201,
        metaData: {
          shop: getInfoData({
            fields: ["email", "name", "_id", "roles"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metaData: null,
    };
  };
}

module.exports = AccessService;
