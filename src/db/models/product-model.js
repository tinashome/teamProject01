import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  // async findByEmail(email) {
  //   const user = await User.findOne({ email });
  //   return user;
  // }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }

  async delete({ productId }) {
    const product = await Product.deleteOne({ productId });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
