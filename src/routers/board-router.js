import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { boardService } from '../services';

const boardRouter = Router();

// 게시글 등록
boardRouter.post('/notice/post', loginRequired, async (req, res, next) => {
  try {
    // const numId = req.body.numId;
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;

    // 위 데이터를 유저 db에 추가하기
    const newPost = await boardService.addPost({
      // numId,
      title,
      content,
      author,
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

// 전체 게시글 목록 (배열 형태임)
boardRouter.get('/notice/posts', async function (req, res, next) {
  try {
    const posts = await boardService.getPosts();

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// 게시글 상세
boardRouter.get('/notice/post/:postId', async function (req, res, next) {
  try {
    const { postId } = req.params;
    const post = await boardService.getPost(postId);

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// 게시글 정보 수정
boardRouter.patch(
  '/notice/post/:postId',
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json로 설정해주세요'
        );
      }

      // params로부터 id를 가져옴
      const postId = req.params.postId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title;
      const content = req.body.content;

      let toUpdate = {};
      // 수정용으로 들어온 데이터의 유무 체크, 후에 있는 데이터만 patch로 수정한다.
      toUpdate = {
        ...(title && { title }),
        ...(content && { content }),
      };

      // 상품 정보를 업데이트함.
      const updatedPostInfo = await boardService.setPost(
        postId,
        toUpdate
      );

      // 업데이트 이후의 상품 데이터를 프론트에 보내 줌
      res.status(200).json(updatedPostInfo);
    } catch (error) {
      next(error);
    }
  }
);


// 게시글 삭제  
boardRouter.delete('/notice/post/:postId', async (req, res, next) => {
  const { postId } = req.params;
  try {
    // 삭제 후 삭제된 정보 반환
    await boardService.delPost(postId);

    // 삭제된 정보 반환
    res.status(200).json("OK");
  } catch (error) {
    next(error);
  }
});

export { boardRouter };
