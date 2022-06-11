import { productModel } from "../db";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class ProductService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 상품등록
  async addProduct(productInfo) {
    // 객체 destructuring
    const { name, price, summary, detail, company, quantity, category, img } =
      productInfo;
    const newProductInfo = {
      name,
      price,
      summary,
      detail,
      company,
      quantity,
      category,
      img,
    };

    // db에 저장
    const createdNewProduct = await this.productModel.create(newProductInfo);

    return createdNewProduct;
  }

  // 상품 목록을 받음.
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  // 상품 상세를 받음.
  async getProduct(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  // 상품 정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setProduct(productId, toUpdate) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error("상품 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 업데이트 진행
    product = await this.productModel.update({
      productId,
      update: toUpdate,
    });
    console.log(product);

    return product;
  }

  // 상품 삭제
  async delProduct(productId) {
    console.log(productId);

    const product = await this.productModel.delete({ productId });
    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
