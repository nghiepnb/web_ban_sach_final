const {
  product,
  electronic,
  clothing,
  clock,
  book,
  furniture,
  phone,
} = require("../models/product.model");
const { BadRequestError } = require("../core/error.response");
const {
  queryProduct,
  publishProductByShop,
  unPublishProductByShop,
  searchProductsByUser,
  findAllProducts,
  findProduct,
  deleteProduct,
  updateProductById,
  findProductsByType,
} = require("../models/repositories/product.repo");
const { insertInventory } = require("../models/repositories/inventory.repo");

const {
  removeUndefinedObject,
  updateNestedObjectParser,
} = require("../utils/index");
class FactoryProduct {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    this.productRegistry[type] = classRef;
  }

  static async createProduct(type, payload) {
    const productClass = this.productRegistry[type];
    if (!productClass)
      throw new BadRequestError(`Invalid request type ${type}`);
    return new productClass(payload).createProduct();
  }

  static async updateProduct(type, payload, productId) {
    const productClass = this.productRegistry[type];
    if (!productClass)
      throw new BadRequestError(`Invalid request type ${type}`);
    return new productClass(payload).updateProduct(productId);
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await unPublishProductByShop({ product_shop, product_id });
  }
  //query

  static async findAllDraftForShop({ product_shop }, limit = 50, skip = 0) {
    const query = { product_shop, isDraft: true };
    return await queryProduct({ query, limit, skip });
  }

  static async findAllPublishForShop({ product_shop }, limit = 50, skip = 0) {
    const query = { product_shop, isPublished: true };
    return await queryProduct({ query, limit, skip });
  }

  static async searchProducts({ keySearch }) {
    return await searchProductsByUser({ keySearch });
  }

  static async findAllProducts({
    limit = 50,
    sort = "ctime",
    page = 1,
    filter = { isPublished: true },
  }) {
    return await findAllProducts({
      limit,
      sort,
      page,
      filter,
    });
  }

  static async findByProductsType({
    limit = 50,
    sort = "ctime",
    page = 1,
    filter = { isPublished: true },
    product_type,
  }) {
    return await findProductsByType({
      limit,
      sort,
      page,
      filter: { ...filter, product_type },
    });
  }

  static async findProduct({ product_id }) {
    return await findProduct({ product_id, unSelect: ["__v"] });
  }

  static async deleteProduct({ product_id }) {
    return await deleteProduct({ product_id });
  }
}

class Product {
  constructor({
    product_name,
    product_thumb,
    product_discount,
    product_price,
    product_description,
    product_quantity,
    product_type,
    product_shop,
    product_attribute,
    product_review,
  }) {
    this.product_name = product_name;
    this.product_discount = product_discount;
    this.product_thumb = product_thumb;
    this.product_price = product_price;
    this.product_description = product_description;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attribute = product_attribute;
    this.product_review = product_review;
  }

  async createProduct(product_id) {
    const newProduct = await product.create({ ...this, _id: product_id });
    return newProduct;
  }

  async updateProduct(productId, bodyUpdate) {
    return await updateProductById({
      productId,
      bodyUpdate,
      model: product,
    });
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClosing = await clothing.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newClosing) throw new BadRequestError("create clothing error");
    const newProduct = await super.createProduct(newClosing._id);
    if (!newProduct) throw new BadRequestError("create new product error");
    return newProduct;
  }

  async updateProduct(productId) {
    const objectParams = removeUndefinedObject(this);

    //where update?
    if (objectParams.product_attribute) {
      await updateProductById({
        productId,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attribute),
        model: clothing,
      });
    }

    const updateProduct = await super.updateProduct(
      productId,
      updateNestedObjectParser(objectParams)
    );
    return updateProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newElectronic) throw new BadRequestError("create clothing error");

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("create new product error");

    return newProduct;
  }
  async updateProduct(productId) {
    const objectParams = removeUndefinedObject(this);

    //where update?
    if (objectParams.product_attribute) {
      await updateProductById({
        productId,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attribute),
        model: clothing,
      });
    }

    const updateProduct = await super.updateProduct(
      productId,
      updateNestedObjectParser(objectParams)
    );
    return updateProduct;
  }
}

class Clock extends Product {
  async createProduct() {
    const newClock = await clock.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newClock) throw new BadRequestError("create Clock error");

    const newProduct = await super.createProduct(newClock._id);
    if (!newProduct) throw new BadRequestError("create new product error");

    return newProduct;
  }
  async updateProduct(productId) {
    const objectParams = removeUndefinedObject(this);

    //where update?
    if (objectParams.product_attribute) {
      await updateProductById({
        productId,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attribute),
        model: clothing,
      });
    }

    const updateProduct = await super.updateProduct(
      productId,
      updateNestedObjectParser(objectParams)
    );
    return updateProduct;
  }
}

class Book extends Product {
  async createProduct() {
    const newBook = await book.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newBook) throw new BadRequestError("create clothing error");

    const newProduct = await super.createProduct(newBook._id);
    if (!newProduct) throw new BadRequestError("create new product error");

    return newProduct;
  }
  async updateProduct(productId) {
    const objectParams = removeUndefinedObject(this);

    //where update?
    if (objectParams.product_attribute) {
      await updateProductById({
        productId,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attribute),
        model: clothing,
      });
    }

    const updateProduct = await super.updateProduct(
      productId,
      updateNestedObjectParser(objectParams)
    );
    return updateProduct;
  }
}

class Phone extends Product {
  async createProduct() {
    const newPhone = await phone.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newPhone) throw new BadRequestError("create clothing error");

    const newProduct = await super.createProduct(newPhone._id);
    if (!newProduct) throw new BadRequestError("create new product error");

    return newProduct;
  }
  async updateProduct(productId) {
    const objectParams = removeUndefinedObject(this);

    //where update?
    if (objectParams.product_attribute) {
      await updateProductById({
        productId,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attribute),
        model: clothing,
      });
    }

    const updateProduct = await super.updateProduct(
      productId,
      updateNestedObjectParser(objectParams)
    );
    return updateProduct;
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await electronic.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newFurniture) throw new BadRequestError("create clothing error");

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) throw new BadRequestError("create new product error");

    return newProduct;
  }
  async updateProduct(productId) {
    const objectParams = removeUndefinedObject(this);

    //where update?
    if (objectParams.product_attribute) {
      await updateProductById({
        productId,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attribute),
        model: clothing,
      });
    }

    const updateProduct = await super.updateProduct(
      productId,
      updateNestedObjectParser(objectParams)
    );
    return updateProduct;
  }
}

FactoryProduct.registerProductType("Electronics", Electronics);
FactoryProduct.registerProductType("Clothings", Clothing);
FactoryProduct.registerProductType("Clock", Clock);
FactoryProduct.registerProductType("Book", Book);
FactoryProduct.registerProductType("Phone", Phone);
FactoryProduct.registerProductType("Furniture", Furniture);

module.exports = FactoryProduct;
