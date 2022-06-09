import { categoryModel } from '../db';

class CategoryService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 카테고리 생성
  async addCategory(categoryInfo) {
    const { name, info } = categoryInfo;
    const newCategoryInfo = { name, info };

    const createdNewCategory = await this.categoryModel.create(newCategoryInfo);

    return createdNewCategory;
  }

  // 카테고리 목록
  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  // 카테고리 한개
  async getCategory(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    return category;
  }

  // 하위 카테고리 여러개 조회
  async getUnderCategory(categoryId) {
    const category = await this.categoryModel.findByBelongTo(categoryId);
    return category;
  }

  // 카테고리 수정
  async setCategory(categoryId, toUpdate) {

    // 우선 해당 id의 카테고리가 db에 있는지 확인
    let category = await this.categoryModel.findById(categoryId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error('카테고리 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    // 업데이트 진행
    category = await this.categoryModel.update({
      categoryId,
      update: toUpdate,
    });

    return category;
  }

  // 카테고리 삭제
  async delCategory(categoryId) {
    const category = await this.categoryModel.delete({categoryId});
    return category;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
