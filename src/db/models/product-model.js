import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';
import fs from "fs";

const Product = model('products', ProductSchema);

export class ProductModel {
  // async findByEmail(email) {
  //   const user = await User.findOne({ email });
  //   return user;
  // }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    
    // img src에서 인식할 수 있도록 수정해서 프론트로 보냄
    product.img = product.img.split("/views")[1];
    console.log(product);

    return product;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll() {
    const products = await Product.find({});

    // img src에서 인식할 수 있도록 수정해서 프론트로 보냄
    products.forEach((product) => product.img = product.img.split("/views")[1])
    console.log(products);

    return products;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    // const option = { returnOriginal: false };

    // const updatedProduct = await Product.findByIdAndUpdate(filter, update,{new: true});
    const updatedProduct = await Product.findOneAndUpdate(filter, update/*, option*/);
    
    // 수정용으로 들어온 img 정보가 있다면 기존 img 삭제
    if(fs.existsSync(updatedProduct.img)) {
      try {
        fs.unlinkSync(updatedProduct.img);
        console.log("image delete");
      } catch (error) {
        console.log(error);
      }
    }
    
    return updatedProduct;
  }

  async delete({ productId }) {
    const product = await Product.findOneAndDelete({ productId });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
