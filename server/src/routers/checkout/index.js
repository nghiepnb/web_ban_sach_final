const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../helpers/asyncHandler");
const checkoutController = require("../../controllers/checkout.controller");
const { authenticationV2 } = require("../../auth/authUntils");

//get Amount a discount
router.post("/review", asyncHandler(checkoutController.checkoutReview));

module.exports = router;
