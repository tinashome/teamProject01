import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {

  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  async findByBelongTo(categoryId) {
    const category = await Category.find({ belongTo: categoryId });
    return category;
  }

  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false }; // true: 업데이트 이전 값 리턴, false: 후 값 리턴

    const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
    return updatedCategory;
  }

  async delete({ categoryId }) {
    const category = await Category.deleteOne({ _id: categoryId });
    return category;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
