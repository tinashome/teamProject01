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
		const { shipAddress, request, orderItems, totalPrice, status } = req.body;

		const newOrder = await orderService.addOrder({ userId, shipAddress, request, orderItems, totalPrice, status });

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
			console.log("basic-user의 주문목록조회 요청이 거부됨");
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

//주문조회(관리,회원)
orderRouter.get("/:userId/:orderId", loginRequired, async function (req, res, next) {
	try {
		const userId = req.params.userId;
		const orderId = req.params.orderId;
    const userRole = await req.currentUserRole;

		const userOrder = await orderService.getUserOrder(userId, orderId);

		if (is.undefined(userOrder) && userRole !== "admin") {
			throw new Error("해당사용자의 주문번호가 존재하지않습니다.");
		}
    const order = await orderService.getOrder(orderId);

    if (is.undefined(order)) {
			throw new Error("해당 주문번호가 존재하지않습니다.");
		}

		res.status(200).json(order);
	} catch (error) {
		next(error);
	}
});

// (관리)주문정보를 변경(배송정보,주문일부취소만 가능)
orderRouter.post("/:orderId", loginRequired, async function (req, res, next) {
	try {
		const userRole = await req.currentUserRole;
		if (userRole !== "admin") {
			console.log(`${userRole}의 전체 주문정보변경 요청이 거부됨`);
			throw new Error("권한이 없습니다.");
		}

		const orderId = req.params.orderId;
		const { shipAddress, request, orderItems, status, totalPrice } = req.body;

		const toUpdate = {
			...(shipAddress && { shipAddress }),
			...(request && { request }),
			...(orderItems && { orderItems }),
			...(status && { status }),
      ...(totalPrice && { totalPrice }),
		};

		// 주문정보를 변경함
		const updateOrderInfo = await orderService.setOrder(orderId, toUpdate);

    // summaryTitle추가하여 보내주기
		// 업데이트 이후의 주문정보를 프론트에 보내 줌
		res.status(200).json(updateOrderInfo);
	} catch (error) {
		next(error);
	}
});

// (회원)주문정보를 변경(발송 전 상태일때 : 배송정보,주문일부취소만 가능)
orderRouter.post("/:userId/:orderId", loginRequired, async function (req, res, next) {
	try {
		const userId = req.params.userId;
		const orderId = req.params.orderId;
		const order = await orderService.getOrder(userId, orderId);

		if (is.undefined(order)) {
			throw new Error("해당사용자의 주문번호가 존재하지않습니다.");
    }
		const { shipAddress, request, orderItems, totalPrice } = req.body;

		const toUpdate = {
			...(shipAddress && { shipAddress }),
			...(request && { request }),
			...(orderItems && { orderItems }),
      ...(totalPrice && { totalPrice }),
		};

		// 주문정보를 변경함
		const updateOrderInfo = await orderService.setOrder(orderId, toUpdate, userId);

    // summaryTitle추가하여 보내주기
		// 업데이트 이후의 주문정보를 프론트에 보내 줌
		res.status(200).json(updateOrderInfo);
	} catch (error) {
		next(error);
	}
});

// (관리)주문을 취소 (주문상태를 주문취소로 변경)
orderRouter.patch("/:orderId", loginRequired, async function (req, res, next) {
	try {
		const userRole = await req.currentUserRole;
		if (userRole !== "admin") {
			console.log(`${userRole}의 전체 주문취소 요청이 거부됨`);
			throw new Error("권한이 없습니다.");
		}

		const orderId = req.params.orderId;

		const deleteOrderInfo = await orderService.deleteOrder(orderId);

    // 취소이후의 주문정보를 프론트에 보내 줌
		res.status(200).json(deleteOrderInfo);
	} catch (error) {
		next(error);
	}
});

// (회원)주문을 취소 (주문상태를 주문취소로 변경)
orderRouter.patch("/:userId/:orderId", loginRequired, async function (req, res, next) {
	try {
		const userId = req.params.userId;
		const orderId = req.params.orderId;
		const order = await orderService.getOrder(userId, orderId);

		if (is.undefined(order)) {
			throw new Error("해당사용자의 주문번호가 존재하지않습니다.");
    }

		const deleteOrderInfo = await orderService.deleteOrder(orderId);

    // 취소이후의 주문정보를 프론트에 보내 줌
		res.status(200).json(deleteOrderInfo);
	} catch (error) {
		next(error);
	}
});
export { orderRouter };
