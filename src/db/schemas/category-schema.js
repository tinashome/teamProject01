import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String, // 이름: 대분류, 중분류, 소분류
      unique: true,
    },
    level: {
      type: Number, // 분류: 0, 1 ,2
    },
    info: {
      type: String, // 설명: 대분류 입니다.
    },
    belongTo: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

export { CategorySchema };
