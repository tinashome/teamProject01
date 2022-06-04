import { orderModel } from "../db";

class OrderService {
	// 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
	constructor(orderModel) {
		this.orderModel = orderModel;
	}

	//새주문
	async addOrder(orderInfo) {
		const { userId, ShipAddress, request, summaryTitle, orderitem, totalPrice, status } = orderInfo;
		const orderId = await this.orderModel.newOrderId();

		const newOrderInfo = { orderId, userId, ShipAddress, request, summaryTitle, orderitem, totalPrice, status };
		const createdNewOrder = await this.orderModel.create(newOrderInfo);

		return createdNewOrder;
	}

  // 전체주문 목록을 받음.
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }
}


const orderService = new OrderService(orderModel);

export { orderService };
