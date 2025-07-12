import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IorderItem {
  productTitle: string;
  ProductImage: string;
  unitPrice: number;
  quantity: number;
}

export interface Iorder extends Document {
  items: IorderItem[];
  totalPrice: number;
  address: string;
  userID: ObjectId | string;
}

const IorderItemSchema = new Schema<IorderItem>({
  productTitle: { type: String, required: true },
  ProductImage: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const IorderSchema = new Schema<Iorder>({
  items: [IorderItemSchema],

  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  userID: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

export const orderModel = mongoose.model<Iorder>("orders", IorderSchema);
