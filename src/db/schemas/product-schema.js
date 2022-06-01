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
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
