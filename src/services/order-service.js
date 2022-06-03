import { orderModel } from "../db";

class OrderService {
	// 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
	constructor(orderModel) {
		this.orderModel = orderModel;
	}

	//새주문
	async addOrder(orderInfo) {
		const { userId, ShipAddress, request, summaryTitle, orderitem, totalPrice, status } = orderInfo;
//orderId생성 날짜 + 일련번호(총문서갯수를 세서 부여하므로 문서삭제시 중복번호 발생함)
		const date = new Date();
		const sYear = date.getFullYear();
		let sMonth = date.getMonth() + 1;
		let sDate = date.getDate();
		sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
		sDate = sDate > 9 ? sDate : "0" + sDate;

		const orderLength = await this.orderModel.count();
		const orderId = String(sYear).slice(2) + sMonth + sDate + String(orderLength).padStart(6, 0);

		const newOrderInfo = { orderId, userId, ShipAddress, request, summaryTitle, orderitem, totalPrice, status };
		const createdNewOrder = await this.orderModel.create(newOrderInfo);

		return createdNewOrder;
	}
}

const orderService = new OrderService(orderModel);

export { orderService };
