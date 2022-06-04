import { orderModel } from "../db";

class OrderService {
	// 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
	constructor(orderModel) {
		this.orderModel = orderModel;
	}

	//새주문
	async addOrder(orderInfo) {
		const { userId, shipAddress, request, summaryTitle, orderitem, totalPrice, status } = orderInfo;
		const orderId = await this.orderModel.newOrderId();

		const newOrderInfo = { orderId, userId, shipAddress, request, summaryTitle, orderitem, totalPrice, status };
		const createdNewOrder = await this.orderModel.create(newOrderInfo);

		return createdNewOrder;
	}

	// userId의 전체주문목록을 받음.userId값이없다면 회원전체주문조회
	async getOrders(userId) {
		if (!userId) {
			const orders = await this.orderModel.findAll();
			return orders;
		}
		const orders = await this.orderModel.find({ userId });
		return orders;
	}

	// 주문 목록을 받음.
	async getOrder(userId, orderId) {
		const orders = await this.orderModel.find({ userId });
		const order = orders.find((e) => e.orderId === orderId);
		return order;
	}

  
  //주문정보를 변경(배송정보,주문변경 가능)
  async setOrder(orderId, toUpdate) {
    // 주문정보가 변경 가능한 상태인지 확인
    let order = await this.orderModel.findByOrderId(orderId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!order) {
      throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    //status가 결제완료 이면 주문정보 변경가능, 배송준비중/발송완료일때는 status만 변경가능

    console.log(toUpdate);
    order = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });

    return order;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
