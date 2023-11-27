const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../helpers/asyncHandler");
const accessController = require("../../controllers/access.controller");
const { authenticationV2 } = require("../../auth/authUntils");

router.post("/shop/login", asyncHandler(accessController.login));
router.post("/shop/signup", asyncHandler(accessController.signUp));

// auth
router.use(authenticationV2);
router.post("/shop/logout", asyncHandler(accessController.logout));
router.post(
  "/shop/handlerRefreshToken",
  asyncHandler(accessController.handlerRefreshToken)
);

module.exports = router;
