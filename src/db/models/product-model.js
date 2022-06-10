import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';
import fs from "fs";
import fsPromises from "node:fs/promises";

const Product = model('products', ProductSchema);

export class ProductModel {

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll() {
    const products = await Product.find({}).populate(['category']);

    // img src에서 인식할 수 있도록 수정해서 프론트로 보냄 (/uploads/~)
    products.forEach((product) => product.img = product.img.split("/views")[1])
    return products;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    
    // img src에서 인식할 수 있도록 가공해 프론트로 보냄 (/uploads/~)
    product.img = product.img.split("/views")[1];
    return product;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: true }; // true: 업데이트 이전 값 리턴, false: 후 값 리턴

    const updatedProduct = await Product.findByIdAndUpdate(filter, update, option);

    // 업데이트하고자 하는 이미지가 있으면!!! 기존 img 삭제
    if(update.img) {
      // fsPromises.access: 성공 undefined반환, 실패 error반환
      const isAbsent = await fsPromises.access(updatedProduct.img);
      if(!isAbsent) {
        try {
          fs.unlink(updatedProduct.img, ()=>{
            console.log("image delete");
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    
    return updatedProduct;
  }

  async delete({ productId }) {
    console.log(productId);
    const product = await Product.findOneAndDelete({ _id: productId });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
