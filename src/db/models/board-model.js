import { model } from 'mongoose';
import { BoardSchema } from '../schemas/board-schema';

const Board = model('boards', BoardSchema);

export class BoardModel {

  async findById(boardId) {
    const post = await Board.findOne({ _id: boardId });
    return post;
  }

  // async findByBelongTo(boardId) {
  //   const category = await Board.find({ belongTo: boardId });
  //   return category;
  // }
  
  async create(boardInfo) {
    const createdNewPost = await Board.create(boardInfo);
    return createdNewPost;
  }

  async findAll() {
    const posts = await Board.find({});
    return posts;
  }

  async update({ boardId, update }) {
    const filter = { _id: boardId };
    const option = { returnOriginal: false }; // true: 업데이트 이전 값 리턴, false: 후 값 리턴

    const updatedPost = await Board.findOneAndUpdate(filter, update, option);
    
    return updatedPost;
  }

  async delete({ boardId }) {
  // async deleteOne({ categoryId }) {
    const post = await Board.deleteOne({ boardId });
    // const result = await Category.deleteOne({ _id: categoryId });
    return post;
  }
}

const boardModel = new BoardModel();

export { boardModel };
