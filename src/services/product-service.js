import { productModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ProductService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 상품등록
  async addProduct(productInfo) {
    // 객체 destructuring
    const { name, price, summary, detail, company, quantity, categoryL, categoryM, categoryS, img } = productInfo;
    const newProductInfo = { name, price, summary, detail, company, quantity, categoryL, categoryM, categoryS, img };
    // 이메일 중복 확인
    // const user = await this.userModel.findById(email);
    // if (user) {
    //   throw new Error(
    //     '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
    //   );
    // }

    // 이메일 중복은 이제 아니므로, 회원가입을 진행함

    // 우선 비밀번호 해쉬화(암호화)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // const newUserInfo = { fullName, email, password: hashedPassword };

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
    // 객체 destructuring
    // const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('상품 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함

    // 비밀번호 일치 여부 확인
    // const correctPasswordHash = user.password;
    // const isPasswordCorrect = await bcrypt.compare(
    //   currentPassword,
    //   correctPasswordHash
    // );

    // if (!isPasswordCorrect) {
    //   throw new Error(
    //     '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
    //   );
    // }

    // 이제 드디어 업데이트 시작

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    // const { password } = toUpdate;

    // if (password) {
    //   const newPasswordHash = await bcrypt.hash(password, 10);
    //   toUpdate.password = newPasswordHash;
    // }

    // 업데이트 진행
    product = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return product;
  }

  // 상품 삭제
  async delProduct(productId) {
    const product = await this.productModel.delete(productId);
    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
