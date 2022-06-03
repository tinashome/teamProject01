import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService } from '../services';

const orderRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
orderRouter.post('/newOrder', loginRequired, async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const userId = req.currentUserId;
    const ShipAddress = req.body.ShipAddress;
    const request = req.body.request;
    const summaryTitle = req.body.summaryTitle;
    const orderitem = req.body.orderitem;
    const totalPrice = req.body.totalPrice;
    const status = req.body.status;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await orderService.addOrder({ userId, ShipAddress, request, summaryTitle, orderitem, totalPrice, status });

    // 추가된 주문의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };