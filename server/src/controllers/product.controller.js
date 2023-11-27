const ProductService = require("../services/product.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");
class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new product success",
      metaData: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "update Product success",
      metaData: await ProductService.updateProduct(
        req.body.product_type,
        {
          ...req.body,
          product_shop: req?.user?.userId,
        },
        req.params.productId
      ),
    }).send(res);
  };

  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish Product Shop success",
      metaData: await ProductService.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  unPublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Un Publish Product Shop success",
      metaData: await ProductService.unPublishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllDraftsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list Drafts success",
      metaData: await ProductService.findAllDraftForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllPublishedForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list Published success",
      metaData: await ProductService.findAllPublishForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getListSearchProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list getListSearchProduct success",
      metaData: await ProductService.searchProducts(req.params),
    }).send(res);
  };

  findAllProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list findAllProducts success",
      metaData: await ProductService.findAllProducts(req.params),
    }).send(res);
  };

  findProductsByType = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list findProductsByType success",
      metaData: await ProductService.findByProductsType(req.params),
    }).send(res);
  };

  findProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list findProduct success",
      metaData: await ProductService.findProduct({
        product_id: req.params.product_id,
      }),
    }).send(res);
  };

  deleteProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "delete product success",
      metaData: await ProductService.deleteProduct({
        product_id: req.params.product_id,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
