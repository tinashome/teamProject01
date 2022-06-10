import { Schema } from 'mongoose';
// import { autoIncrement } from require('mongoose-auto-increment');

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
    // level: {
    //   type: Number, // 답글을 위한 깊이
    // },
    // belongTo: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'boards',
    // },
  },
  {
    collection: "boards",
    timestamps: true,
  }
);

export { BoardSchema };
