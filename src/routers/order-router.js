import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { orderService } from "../services";

const orderRouter = Router();

orderRouter.post("/", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
		}

		const userId = req.currentUserId;
		const { ShipAddress, request, summaryTitle, orderitem, totalPrice, status } = req.body;

		const newOrder = await orderService.addOrder({ userId, ShipAddress, request, summaryTitle, orderitem, totalPrice, status });

		res.status(201).json(newOrder);
	} catch (error) {
		next(error);
	}
});

orderRouter.get('/', loginRequired, async function (req, res, next) {
  try {
    const userRole = await req.currentUserRole;
    if (userRole !== "admin" ){
      console.log("basic-user 등급 유저의 주문목록조회 요청이 거부됨")
      throw new Error(
        '권한이 없습니다.'
      );
    }
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});


export { orderRouter };
