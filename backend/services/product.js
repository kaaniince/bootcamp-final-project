const mongooseProduct = require("../models/product");

async function createProduct(productParams) {
  try {
    const { title, price, image, description, color, stock, category } =
      productParams;
    const newProduct = new mongooseProduct({
      price,
      title,
      image,
      description,
      color,
      stock,
      category,
    });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error("Ürün oluşturulurken hata oluştu:", error);
    return null;
  }
}

async function getProduct(productParams) {
  const { id } = productParams;
  try {
    const product = await mongooseProduct.findById(id);
    return product;
  } catch (error) {
    console.error("Ürün getirilirken hata oluştu:", error);
    return null;
  }
}

async function getProducts() {
  try {
    const products = await mongooseProduct.find();
    return products;
  } catch (error) {
    console.error("Ürünler getirilirken hata oluştu:", error);
    return [];
  }
}

async function updateProduct(productParams) {
  const { id, price, title, image, description, color, stock, category } =
    productParams;
  try {
    const product = await mongooseProduct.findById(id);

    product.price = price;
    product.title = title;
    product.image = image;
    product.description = description;
    product.color = color;
    product.stock = stock;
    product.category = category;
    await product.save();
    return product;
  } catch (error) {
    console.error("Ürün güncellenirken hata oluştu:", error);
    return null;
  }
}

async function deleteProduct(productParams) {
  const { id } = productParams;
  try {
    const deletedProduct = await mongooseProduct.findByIdAndDelete(id);
    return deletedProduct ? true : false;
  } catch (error) {
    console.error("Ürün silinirken hata oluştu:", error);
    return false;
  }
}

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
