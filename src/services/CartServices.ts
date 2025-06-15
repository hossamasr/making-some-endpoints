import { CartModel } from "../models/CartModel";

interface CreateCartForUser {
  userID: string;
}

const CreateCartForUser = async ({ userID }: CreateCartForUser) => {
  const cart = await CartModel.create({ userID,totalPrice:0 });
  await cart.save();
  return cart;
};
interface getActiveCartForUser {
  userID: string;
}

export const getActiveCartForUser = async ({
  userID,
}: getActiveCartForUser) => {
  const cart = await CartModel.findOne({ userID, status: "active" });
  if (!cart) {
    const cart = await CreateCartForUser({ userID });
  }

  return cart;
};
