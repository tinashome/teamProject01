import { orderModel } from "../db";

class OrderService {
	// 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
	constructor(orderModel) {
		this.orderModel = orderModel;
	}

	//새주문
	async addOrder(orderInfo) {
		const { userId, shipAddress, request, orderItems, totalPrice, status } = orderInfo;

    const summaryTitle = orderItems.reduce((acc,cur,idx)=> acc + `${idx===0?"":"\n"}${cur.productName} ${cur.quantity}개`, "")
		const orderId = await this.orderModel.newOrderId();

		const newOrderInfo = { orderId, userId, shipAddress, request, summaryTitle, orderItems, totalPrice, status };
		const createdNewOrder = await this.orderModel.create(newOrderInfo);

		return createdNewOrder;
	}

	// userId의 전체주문목록을 조회.userId값이없다면 회원전체주문조회
	async getOrders(userId) {
		if (!userId) {
			const orders = await this.orderModel.findAll();
			return orders;
		}
		const orders = await this.orderModel.find({ userId });
		return orders;
	}

	// userId의 주문을 조회
	async getUserOrder(userId, orderId) {
		const orders = await this.orderModel.find({ userId });
		const order = orders.find((e) => e.orderId === orderId);
		return order;
	}

  // 주문을 조회
	async getOrder(orderId) {
		const order = await this.orderModel.find({ orderId });
		return order;
	}

  //주문정보를 변경(배송정보,주문변경 가능)
  async setOrder(orderId, toUpdate, userId) {
    // 주문정보가 변경 가능한 상태인지 확인
    const order = await this.orderModel.findByOrderId(orderId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!order) {
      throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }else if(order.status !== "결제완료" && userId){
      throw new Error(`${order.status} : 주문변경이 불가능합니다. 고객센터에 문의 바랍니다.`);
    }

    //shipAddress,orderItems은 변경후 전체를 받아야함, 변경 값만 받으면 나머지는 초기화됨
    //status가 결제완료 이면 주문정보 변경가능, 배송준비중/발송완료일때는 변경 불가
    if (toUpdate.orderItems){
      const summaryTitle = toUpdate.orderItems.reduce((acc,cur,idx)=> acc + `${idx===0?"":"\n"}${cur.productName} ${cur.quantity}개`, "")
      toUpdate.summaryTitle = summaryTitle;
    }
    const updatedOrder = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });

    return updatedOrder;
  }

    // 주문을 취소 (주문상태를 주문취소로 변경)
    async deleteOrder(orderId, userId) {

      const order = await this.orderModel.findByOrderId(orderId);
  
      // db에서 찾지 못한 경우, 에러 메시지 반환
      // 관리등급이 아닐 경우 본인의 주문만 
      if (!order) {
        throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
      }else if(order.status !== "결제완료" && userId){
        throw new Error(`${order.status} : 주문취소가 불가능합니다. 고객센터에 문의 바랍니다.`);
      }

      const update = { status : "주문취소" };

      const deletedOrder = await this.orderModel.update({
        orderId,
        update,
      });

      return deletedOrder;
    }
}

const orderService = new OrderService(orderModel);

export { orderService };
