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
    category: { 
      type: Schema.Types.ObjectId, 
      ref: 'categories',
    },
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
