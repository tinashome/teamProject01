import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
// import { loginRequired } from '../middlewares';
import { productService } from '../services';
import { upload } from '../middlewares';
import fs from "fs";

const productRouter = Router();

// 상품등록 api (/api/product/register로 요청해야 함.)
productRouter.post('/product', upload.single("upload"), async (req, res, next) => {
  try {
    console.log(req.body);

    if(!req.file) {
      throw new Error(
        `파일이 첨부되지 않았습니다. form의 enctype="multipart/form-data"으로 지정했는지, 내부의 input 태그의 name인자를 upload로 지정해주세요.`
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const name = req.body.name;
    const price = Number(req.body.price);
    const summary = req.body.summary;
    const detail = req.body.detail;
    const company = req.body.company;
    const quantity = Number(req.body.quantity);
    // 카테고리 세종류는 id값으로 들어와야한다.
    const categoryL = req.body.categoryL;
    const categoryM = req.body.categoryM;
    const categoryS = req.body.categoryS;
    const img = req.file.path.replaceAll("\\", "/"); 

    // 위 데이터를 유저 db에 추가하기
    const newProduct = await productService.addProduct({
      name,
      price,
      summary,
      detail,
      company,
      quantity,
      categoryL,
      categoryM,
      categoryS,
      img
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// 전체 상품 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
productRouter.get('/products', /*loginRequired,*/ async function (req, res, next) {
  try {
    // 전체 상품 목록을 얻음
    const products = await productService.getProducts();

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 상품 상세를 가져옴
productRouter.get('/product/:productId', async function (req, res, next) {
  try {
    // 전체 상품 목록을 얻음
    const { productId } = req.params;
    const product = await productService.getProduct(productId);

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 정보 수정
// (예를 들어 /api/products/abc12345 로 요청하면 req.params.productId 'abc12345' 문자열로 됨)
productRouter.patch(
  '/products/:productId',
  upload.single("upload"),
  // loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/form-data로 설정해주세요'
        );
      }

      // params로부터 id를 가져옴
      const productId = req.params.productId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name;
      const price = Number(req.body.price);
      const summary = req.body.summary;
      const detail = req.body.detail;
      const company = req.body.company;
      const quantity = Number(req.body.quantity);
      const categoryL = req.body.categoryL;
      const categoryM = req.body.categoryM;
      const categoryS = req.body.categoryS;
      let img;
      if(req.file) {
        img = req.file.path.replaceAll("\\", "/"); 
      } else {
        img = undefined;
      }

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      // const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      // if (!currentPassword) {
      //   throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
      // }

      // const userInfoRequired = { userId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.


      let toUpdate = {};
      // 수정용으로 들어온 데이터의 유무 체크, 후에 있는 데이터만 patch로 수정한다.
      if(req.file) {
        toUpdate = {
          ...(name && { name }),
          ...(price && { price }),
          ...(summary && { summary }),
          ...(detail && { detail }),
          ...(company && { company }),
          ...(quantity && { quantity }),
          ...(categoryL && { categoryL }),
          ...(categoryM && { categoryM }),
          ...(categoryS && { categoryS }),
          ...(img && { img }),
        };
      } else {
        toUpdate = {
          ...(name && { name }),
          ...(price && { price }),
          ...(summary && { summary }),
          ...(detail && { detail }),
          ...(company && { company }),
          ...(quantity && { quantity }),
          ...(categoryL && { categoryL }),
          ...(categoryM && { categoryM }),
          ...(categoryS && { categoryS }),
        };
      }

      // 상품 정보를 업데이트함.
      const updatedProductInfo = await productService.setProduct(
        productId,
        toUpdate
      );

      // 업데이트 이후의 상품 데이터를 프론트에 보내 줌
      res.status(200).json(updatedProductInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 상품 삭제  
productRouter.delete('/products/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    // 삭제 후 삭제된 정보 반환
    const deletedProduct = await productService.delProduct(productId);

    // 삭제된 데이터의 img path를 받아서 기존 img 삭제
    if(fs.existsSync(deletedProduct.img)) {
      try {
        fs.unlinkSync(deletedProduct.img);
        console.log("image delete");
      } catch (error) {
        console.log(error);
      }
    }

    // 삭제된 정보 반환
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
