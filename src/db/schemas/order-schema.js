import mongoose, { mongo, Schema } from "mongoose";

const OrderSchema = new Schema(
	{
		//model에 작성된 count메소드를 이용하여 220101000001 의 형식으로 부여
		orderId: {
			type: String,
			required: true,
		},
		orderDate: {
			type: Date,
			required: true,
		},
		customerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		ShipAddress: {
			type: new Schema(
				{
					postalCode: String,
					address1: String,
					address2: String,
					phoneNumber: String,
				},
				{
					_id: false,
				}
			),
			required: false,
		},
		orderProduct: [
			{
				type: new Schema(
					{
						productId: { type: Schema.Types.ObjectId, ref: "products" },
						productName: String,
						productPrice: Number,
						productQuantity: Number,
					},
					{
						_id: false,
					}
				),
				required: true,
			},
		],
		orderTotal: {
			type: Number,
			required: true,
		},
		orderStaue: {
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
