import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
// import { loginRequired } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

// 카테고리 등록
categoryRouter.post('/category', async (req, res, next) => {
  try {
    console.log(req);
    // req (request)의 body 에서 데이터 가져오기
    const name = req.body.name;
    const info = req.body.info;

    // 위 데이터를 유저 db에 추가하기
    const newCategory = await categoryService.addCategory({
      name,
      info,
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// 전체 카테고리 목록 (배열 형태임)
categoryRouter.get('/categories', async function (req, res, next) {
  try {
    const categories = await categoryService.getCategories();

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

// 카테고리 상세
categoryRouter.get('/category/:categoryId', async function (req, res, next) {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategory(categoryId);

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

// 하위 카테고리 조회
categoryRouter.get('/category/belongTo/:categoryId', async function (req, res, next) {
  try {
    // 전체 상품 목록을 얻음
    const { categoryId } = req.params;
    const categories = await categoryService.getUnderCategory(categoryId);

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});


// 카테고리 정보 수정
categoryRouter.patch(
  '/categories/:categoryId',
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
      const categoryId = req.params.categoryId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name;
      const info = req.body.info;

      let toUpdate = {};
      // 수정용으로 들어온 데이터의 유무 체크, 후에 있는 데이터만 patch로 수정한다.
      toUpdate = {
        ...(name && { name }),
        ...(info && { info }),
      };

      // 상품 정보를 업데이트함.
      const updatedCategoryInfo = await categoryService.setCategory(
        categoryId,
        toUpdate
      );

      // 업데이트 이후의 상품 데이터를 프론트에 보내 줌
      res.status(200).json(updatedCategoryInfo);
    } catch (error) {
      next(error);
    }
  }
);


// 카테고리 삭제  
categoryRouter.delete('/categories/:categoryId', async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    // 삭제 후 삭제된 정보 반환
    await categoryService.delCategory(categoryId);

    // 삭제된 정보 반환
    res.status(200).json("OK");
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
