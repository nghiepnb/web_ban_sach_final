const { findById } = require("../services/apiKey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY];
  if (!key) {
    return res.status(403).json({
      message: "Forbidden Error 1",
    });
  }

  //check objKey exist
  const objKey = await findById(key);

  if (!objKey) {
    return res.status(403).json({
      message: "Forbidden Error 2",
    });
  }
  req.objKey = objKey;
  return next();
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "permission denied",
      });
    }

    const validPermission = req.objKey.permissions.includes(permission);

    if (!validPermission) {
      return res.status(403).json({
        message: "permission denied",
      });
    }
    return next();
  };
};
module.exports = {
  apiKey,
  permission,
};
