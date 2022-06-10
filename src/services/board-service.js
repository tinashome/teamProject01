import { boardModel } from '../db';

class BoardService {
  // 본 파일의 맨 아래에서, new BoardService(boardModel) 하면, 이 함수의 인자로 전달됨
  constructor(boardModel) {
    this.boardModel = boardModel;
  }

  // 게시글 생성
  async addPost(postInfo) {
    const { numId, title, content, author } = postInfo;
    const newPostInfo = { numId, title, content, author };

    const createdNewPost = await this.boardModel.create(newPostInfo);

    return createdNewPost;
  }

  // 게시글 목록
  async getPosts() {
    const posts = await this.boardModel.findAll();
    return posts;
  }

  // 게시글 한개
  async getPost(postId) {
    const post = await this.boardModel.findById(postId);
    return post;
  }

  // 하위 카테고리 여러개 조회
  // async getUnderCategory(postId) {
  //   const category = await this.boardModel.findByBelongTo(postId);
  //   return category;
  // }

  // 게시글 수정
  async setPost(postId, toUpdate) {

    // 우선 해당 id의 카테고리가 db에 있는지 확인
    let post = await this.boardModel.findById(postId);
    console.log(post);
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!post) {
      throw new Error('게시글이 없습니다. 다시 한 번 확인해 주세요.');
    }
    // 업데이트 진행
    post = await this.boardModel.update({
      postId,
      update: toUpdate,
    });

    return post;
  }

  // 게시글 삭제
  async delPost(postId) {
    const post = await this.boardModel.delete({postId});
    return post;
  }
}

const boardService = new BoardService(boardModel);

export { boardService };
