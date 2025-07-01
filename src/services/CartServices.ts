import { CartModel } from "../models/CartModel";
import { productModel } from "../models/ProductModel";

interface CreateCartForUser {
  userID: string;
}

const CreateCartForUser = async ({ userID }: CreateCartForUser) => {
  const cart = await CartModel.create({ userID, totalPrice: 0 });
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
    return cart;
  }

  return cart;
};

interface AddItemtoCart {
  userID: string;
  productID: string;
  quantity: number;
}

export const addItemtocart = async ({
  userID,
  productID,
  quantity,
}: AddItemtoCart) => {
  const cart = await getActiveCartForUser({ userID });
  // product not found
  const existIncart = cart?.items.find((p) => {
    return p.product._id?.toString() === productID;
  });

  if (existIncart) {
    return { data: "item already exists", statusCode: 400 };
  }
  const product = await productModel.findById(productID);
  if (!product) {
    return { data: "item not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "out of stock", statusCode: 400 };
  }
  cart?.items.push({ product: product, unitPrice: product.price, quantity });
  // update price
  if (cart) {
    cart.totalPrice += product.price * quantity;
  }
  const updatedcart = await cart?.save();
  return { data: updatedcart, statusCode: 201 };
};
