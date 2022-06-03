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
    info: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    categoryL: { 
      type: String, 
    },
    categoryM: { 
      type: String, 
    },
    categoryS: { 
      type: String, 
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
