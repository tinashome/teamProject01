import { Schema } from 'mongoose';

const BoardSchema = new Schema(
  {
    numId: {
      type: Number,
    },
    title: {
      type: String, 
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    views: {
      type: Number,
      default: 0,
    }
  },
  {
    collection: "boards",
    timestamps: true,
  }
);

export { BoardSchema };
