import { model } from 'mongoose';
import { BoardSchema } from '../schemas/board-schema';

const Board = model('boards', BoardSchema);

export class BoardModel {

  async findById(boardId) {
    const post = await Board.findOne({ _id: boardId }).populate(['author']);
    return post;
  }
  
  async create(boardInfo) {
    const createdNewPost = await Board.create(boardInfo);
    return createdNewPost;
  }

  async findAll() {
    const posts = await Board.find({}).populate(['author']);;
    return posts;
  }

  async update({ postId, update }) {
    const filter = { _id: postId };
    const option = { returnOriginal: false }; // true: 업데이트 이전 값 리턴, false: 후 값 리턴

    const updatedPost = await Board.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  async delete({ postId }) {
  // async deleteOne({ categoryId }) {
    const post = await Board.deleteOne({ _id: postId });
    // const result = await Category.deleteOne({ _id: categoryId });
    return post;
  }
}

const boardModel = new BoardModel();

export { boardModel };