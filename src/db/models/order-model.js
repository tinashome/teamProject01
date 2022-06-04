import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
	async findById(orderId) {
		const order = await Order.findOne({ _Id: orderId });
		return order;
	}

  async findByOrderId(orderId) {
		const order = await Order.findOne({ orderId: orderId });
		return order;
	}

	async create(orderInfo) {
		const createdNewOrder = await Order.create(orderInfo);
		return createdNewOrder;
	}

	async findAll() {
		const orders = await Order.find({});
		return orders;
	}

	async find(order) {
		const orders = await Order.find(order);
		return orders;
	}

	async update({ orderId, update }) {
		const filter = { orderId: orderId };
		const option = { returnOriginal: false };

		const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
		return updatedOrder;
	}

	async delete({ orderId }) {
		const filter = { _id: orderId };

		const deleteOrder = await Order.findOneAndRemove(filter);
		return deleteOrder;
	}

	async count() {
		const counts = await Order.count();
		return counts;
	}

	//주문번호생성
	async newOrderId() {
		//orderId생성 날짜 + 일련번호(총문서갯수를 세서 부여하므로 문서삭제시 중복번호 발생함)
		const date = new Date();
		const sYear = date.getFullYear();
		let sMonth = date.getMonth() + 1;
		let sDate = date.getDate();

		sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
		sDate = sDate > 9 ? sDate : "0" + sDate;

		const orderLength = await Order.count();
		const orderId = String(sYear).slice(2) + sMonth + sDate + String(orderLength).padStart(6, 0);

		return orderId;
	}
}

const orderModel = new OrderModel();

export { orderModel };
