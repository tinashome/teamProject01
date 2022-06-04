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

		const newUser = await orderService.addOrder({ userId, ShipAddress, request, summaryTitle, orderitem, totalPrice, status });

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
});

export { orderRouter };
