import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IProduct } from "./ProductModel";
const CartStatusEnum = ["active", "completed"];

export interface ICartItem {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userID: ObjectId | string;
  items: ICartItem[];
  totalPrice: number;
  status: "active" | "completed";
}

const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1, required: true },
});

const CartSchema = new Schema<ICart>({
  userID: { type: Schema.Types.ObjectId, ref: "users", required: true },
  items: [CartItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: CartStatusEnum, default: "active" },
});

export const CartModel = mongoose.model<ICart>("carts", CartSchema);
