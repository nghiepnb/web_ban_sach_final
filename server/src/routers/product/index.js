const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../helpers/asyncHandler");
const productController = require("../../controllers/product.controller");
const { authenticationV2 } = require("../../auth/authUntils");

router.get("/:product_id", asyncHandler(productController.findProduct));
router.delete("/:product_id", asyncHandler(productController.deleteProduct));
router.get(
  "/search/:keySearch",
  asyncHandler(productController.getListSearchProduct)
);
router.get("", asyncHandler(productController.findAllProducts));
router.get(
  "/type/:product_type",
  asyncHandler(productController.findProductsByType)
);
router.patch("/:productId", asyncHandler(productController.updateProduct));

// auth
router.use(authenticationV2);

router.post("", asyncHandler(productController.createProduct));
router.post(
  "/publish/:id",
  asyncHandler(productController.publishProductByShop)
);
router.post(
  "/unpublish/:id",
  asyncHandler(productController.unPublishProductByShop)
);

router.get("/drafts/all", asyncHandler(productController.getAllDraftsForShop));
router.get(
  "/published/all",
  asyncHandler(productController.getAllPublishedForShop)
);

module.exports = router;
