// import mongoose, { mongo, Schema } from "mongoose";
import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
	{
		//model에 작성된 count메소드를 이용하여 220101000001 의 형식으로 부여
		orderId: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		shipAddress: {
			type: new Schema(
				{
					postalCode: String,
					address1: String,
					address2: String,
					receiverName: String,
					receiverPhoneNumber: String,
				},
				{
					_id: false,
				}
			),
			required: false,
		},
		request: {
			type: String,
			required: true,
		},
		summaryTitle: {
			type: String,
			required: true,
		},
		orderItems: [
			{
				type: new Schema(
					{
						productId: { type: Schema.Types.ObjectId, ref: "products" },
						productName: String,
						price: Number,
						quantity: Number,
						totalPrice: Number,
					},
					{
						_id: false,
					}
				),
				required: true,
			},
		],
		totalPrice: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		collection: "orders",
		timestamps: true,
	}
);

export { OrderSchema };
