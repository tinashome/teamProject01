import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
    },
    detail: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // TODO: 시간 있으면 추후 img, category는 populate로 전환
    // 결과값은 그대로 일 것이므로 프론트에 영향X
    category: { 
      type: Schema.Types.ObjectId, 
      ref: 'categories',
    },
    // categoryM: { 
    //   type: Schema.Types.ObjectId, 
    //   ref: 'categories',
    // },
    // categoryS: { 
    //   type: Schema.Types.ObjectId, 
    //   ref: 'categories',
    // },
    img: {
      type: String,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { ProductSchema };
