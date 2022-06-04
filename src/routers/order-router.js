import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { orderService } from "../services";

const orderRouter = Router();

//주문생성
orderRouter.post("/", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
		}

		const userId = req.currentUserId;
		const { shipAddress, request, summaryTitle, orderitem, totalPrice, status } = req.body;

		const newOrder = await orderService.addOrder({ userId, shipAddress, request, summaryTitle, orderitem, totalPrice, status });

		res.status(201).json(newOrder);
	} catch (error) {
		next(error);
	}
});

//주문목록조회(관리자)
orderRouter.get("/", loginRequired, async function (req, res, next) {
	try {
		const userRole = await req.currentUserRole;
		if (userRole !== "admin") {
			console.log("basic-user 등급 유저의 주문목록조회 요청이 거부됨");
			throw new Error("권한이 없습니다.");
		}
		const orders = await orderService.getOrders();

		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
});

//전체주문조회(회원)
orderRouter.get("/:userId", loginRequired, async function (req, res, next) {
	try {
		const userId = req.params.userId;
		const orders = await orderService.getOrders(userId);

		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
});

//주문조회(회원)
orderRouter.get("/:userId/:orderId", loginRequired, async function (req, res, next) {
	try {
		const userId = req.params.userId;
		const orderId = req.params.orderId;
		const order = await orderService.getOrder(userId, orderId);

		if (is.undefined(order)) {
			throw new Error("해당사용자의 주문번호가 존재하지않습니다.");
		}

		res.status(200).json(order);
	} catch (error) {
		next(error);
	}
});

// (관리)주문정보를 변경(배송정보,주문일부취소만 가능)
orderRouter.patch("/:orderId", loginRequired, async function (req, res, next) {
	try {
		const userRole = await req.currentUserRole;
		if (userRole !== "admin") {
			console.log("basic-user 등급 유저의 전체 주문정보변경 요청이 거부됨");
			throw new Error("권한이 없습니다.");
		}

		const orderId = req.params.orderId;
		const { shipAddress, request, summaryTitle, orderitem, totalPrice, status } = req.body;

		const toUpdate = {
			...(shipAddress && { shipAddress }),
			...(request && { request }),
			...(summaryTitle && { summaryTitle }),
			...(orderitem && { orderitem }),
			...(totalPrice && { totalPrice }),
			...(status && { status }),
		};

    console.log(toUpdate);

		// 주문정보를 변경함
		const updateOrderInfo = await orderService.setOrder(orderId, toUpdate);

		// 업데이트 이후의 주문정보를 프론트에 보내 줌
		res.status(200).json(updateOrderInfo);
	} catch (error) {
		next(error);
	}
});

export { orderRouter };
